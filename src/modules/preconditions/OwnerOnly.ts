import { Precondition } from '@sapphire/framework'
import { Message } from 'discord.js'

export class OwnerOnlyPrecondition extends Precondition {
    public run(message: Message) {
        const { float } = this.container

        return float.config.owners.includes(message.author.id)
            ? this.ok()
            : this.error({
                  message: 'this command is owner only',
              })
    }
}

declare module '@sapphire/framework' {
    interface Preconditions {
        OwnerOnly: never
    }
}
