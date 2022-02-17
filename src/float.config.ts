import { FloatConfig } from '#lib/config/config.interface'
import { join } from 'path'

export const config: FloatConfig = {
    application: 'Float',
    owners: ['392264789360902156'],

    env: {
        logLevel: 'DEBUG',
    },

    client: {
        intents: [
            'GUILDS',
            'GUILD_MEMBERS',
            'GUILD_MESSAGES',
            'GUILD_MESSAGE_REACTIONS',
        ],

        baseUserDirectory: join(process.cwd(), 'dist/modules'),
        caseInsensitiveCommands: true,
        caseInsensitivePrefixes: true,

        loadMessageCommandListeners: true,

        logger: undefined,
        shards: 'auto',
    },
}
