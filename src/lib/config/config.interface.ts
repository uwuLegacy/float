import { ClientOptions } from 'discord.js'
import '@sapphire/framework'

export interface EnvironmentConfig {
    // logLevel: typeof keyof LogLevel
}

export interface FloatConfig {
    client: ClientOptions
    env: EnvironmentConfig
}
