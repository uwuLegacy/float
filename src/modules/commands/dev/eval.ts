import { ApplyOptions } from '@sapphire/decorators'
import { Args, Command } from '@sapphire/framework'
import Type from '@sapphire/type'
import { codeBlock, isThenable } from '@sapphire/utilities'
import { Message } from 'discord.js'
import { send } from '@sapphire/plugin-editable-commands'
import { inspect } from 'util'

@ApplyOptions<Command.Options>({
    aliases: ['exec', 'evaluate', 'execute'],
    description: 'Evaluates a JavaScript expression.',
    preconditions: ['OwnerOnly'],
    flags: ['async', 'hidden', 'silent', 's', 'showHidden'],
    options: ['depth'],
})
export class EvalCommand extends Command {
    public async messageRun(message: Message, args: Args) {
        const { float } = this.container

        const code = await args.rest('string')

        const { result, success, type } = await this.eval(message, code, {
            async: args.getFlags('async'),
            depth: Number(args.getOption('depth')) ?? 0,
            showHidden: args.getFlags('hidden', 'showHidden'),
        })

        const output = success
            ? codeBlock('js', result)
            : `**Error:** ${codeBlock('bash', result)}`

        if (args.getFlags('silent', 's')) return null

        const typeFooter = `**Type:** ${codeBlock('typescript', type)}`

        if (output.length > 2000) {
            return send(message, {
                content: `output exceeded 2000 characters, sending as file\n\n${typeFooter}`,
                files: [{ attachment: Buffer.from(output), name: 'output.js' }],
            })
        }

        return send(message, `${output}\n${typeFooter}`)
    }

    private async eval(
        message: Message,
        code: string,
        flags: {
            async: boolean
            depth: number
            showHidden: boolean
        }
    ) {
        if (flags.async) code = `(async () => {\n${code}\n})();`

        /* eslint-disable @typescript-eslint/no-unused-vars */
        const msg = message
        const client = this.container.float
        const logger = this.container.float.ogma
        const prisma = this.container.float.prisma
        /* eslint-enable @typescript-eslint/no-unused-vars */

        let success = true
        let result = null

        try {
            result = eval(code)
        } catch (err) {
            if (err && err instanceof Error && err.stack) {
                logger.printError(err, { context: 'EvalCommand' })
            }

            result = err
            success = false
        }

        const type = new Type(result).toString()
        if (isThenable(result)) result = await result

        if (typeof result !== 'string') {
            result = inspect(result, {
                depth: flags.depth,
                showHidden: flags.showHidden,
            })
        }

        return {
            result,
            success,
            type,
        }
    }
}
