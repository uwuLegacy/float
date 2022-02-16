import { FloatConfig } from '#lib/config/config.interface'
import { join } from 'path'

export const config: FloatConfig = {
    application: 'Float',
    owners: ['<your-discord-id>'],

    env: {
        logLevel: 'DEBUG',
    },

    client: {
        intents: ['Guilds'],

        baseUserDirectory: join(process.cwd(), 'dist/modules'),
        caseInsensitiveCommands: true,
        caseInsensitivePrefixes: true,

        loadMessageCommandListeners: true,

        logger: undefined,
        shards: 'auto',
    },
}
