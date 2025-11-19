import { createClient } from 'tinacms/dist/client'
import { queries } from './types'

const branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.TINA_BRANCH || 'main'
const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || process.env.TINA_CLIENT_ID
const token = process.env.NEXT_PUBLIC_TINA_TOKEN || process.env.TINA_TOKEN || ''

const isLocal = !clientId
const url = isLocal
  ? 'http://localhost:4001/graphql'
  : `https://content.tinajs.io/content/${clientId}/github/${branch}`

export const client = createClient({ url, token, queries })
export default client
