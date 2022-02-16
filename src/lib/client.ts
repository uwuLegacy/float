import { SapphireClient } from '@sapphire/framework'
import { FloatConfig } from './config/config.interface'

export class FloatClient extends SapphireClient {
    public constructor(public readonly config: FloatConfig) {
        super(config.client)
    }

    public async start() {
        await this.login(process.env.AUTHORIZATION)
    }

    private setupStoreEventHandlers() {}
}
