import { FloatClient } from '#lib/client'
import { config } from './float.config'

const client = new FloatClient(config)
client.start()
