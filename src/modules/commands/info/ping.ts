import { Command } from '@sapphire/framework'
import { send } from '@sapphire/plugin-editable-commands'
import { Message } from 'discord.js'

export class PingCommand extends Command {
    public async messageRun(message: Message) {
        const { float } = this.container
        console.log(float)

        const sentMsg = await send(message, 'Pinging...')
        return sentMsg.edit(
            `API Latency: ${Math.round(float.ws.ping)}ms, Round trip: ${
                sentMsg.createdTimestamp - message.createdTimestamp
            }ms.`
        )
    }
}
