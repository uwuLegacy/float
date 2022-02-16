import { ClientOptions } from 'discord.js'
import { LogLevel } from '@ogma/common'
import '@sapphire/framework'

export interface EnvironmentConfig {
    logLevel: keyof typeof LogLevel
}

export interface FloatConfig {
    application: string
    owners: string[]

    client: ClientOptions
    env: EnvironmentConfig
}
