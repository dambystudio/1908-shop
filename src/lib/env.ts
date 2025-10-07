import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  // TinaCMS (optional for MVP - can run without credentials in local mode)
  TINA_CLIENT_ID: z.string().optional(),
  TINA_TOKEN: z.string().optional(),
  // Analytics (optional)
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
})

const envParsed = envSchema.safeParse(process.env)

if (!envParsed.success) {
  console.error('❌ Invalid environment variables:', envParsed.error.flatten().fieldErrors)
  throw new Error('Invalid environment variables')
}

export const env = envParsed.data
