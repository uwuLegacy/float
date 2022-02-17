import { SapphireClient, Store } from '@sapphire/framework'
import { FloatConfig } from './config/config.interface'
import { Ogma, OgmaPrintOptions } from '@ogma/logger'
import '@sapphire/pieces'
import { Stopwatch } from '@sapphire/stopwatch'
import Prisma from '@prisma/client'
import prisma from './prisma'

export class FloatClient extends SapphireClient {
    public constructor(public readonly config: FloatConfig) {
        super(config.client)

        this.stopwatch = new Stopwatch()
        this.prisma = prisma
        this.ogma = new Ogma({
            application: config.application,
            context: 'FloatClient',
            logLevel: config.env.logLevel,
        })

        this.setupStoreEventHandlers()

        this.ogma.log(`Client constructed`)
    }

    public ogma: Ogma
    public stopwatch: Stopwatch
    public prisma: Prisma.PrismaClient

    public async start() {
        await this.login(process.env.AUTHORIZATION)

        this.ogma.log(`Logged in as ${this.user?.tag}`)
        this.ogma.log(
            `Initialization took ${Math.round(this.stopwatch.duration)}ms`
        )
    }

    private setupStoreEventHandlers(): void {
        const meta: OgmaPrintOptions = { context: 'LoaderService' }

        Store.defaultStrategy.onLoad = (s, p) =>
            this.ogma.debug(`Loaded ${s.name}:${p.name}`, meta)

        Store.defaultStrategy.onUnload = (s, p) =>
            this.ogma.debug(`Unloaded ${s.name}:${p.name}`, meta)
    }
}

declare module '@sapphire/pieces' {
    interface Container {
        float: FloatClient
    }
}
