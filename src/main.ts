import { FloatClient } from '#lib/client'
import { config } from './float.config'
import { config as dotenvConfig } from 'dotenv'

import '@sapphire/plugin-editable-commands/register'

dotenvConfig()

const client = new FloatClient(config)
client.start()
