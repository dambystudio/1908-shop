import { z } from 'zod'

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    // TinaCMS (optional for MVP - can run without credentials in local mode)
    TINA_CLIENT_ID: z.string().optional(),
    TINA_TOKEN: z.string().optional(),
    TINA_BRANCH: z.string().default('main'),
    NEXT_PUBLIC_TINA_CLIENT_ID: z.string().optional(),
    NEXT_PUBLIC_TINA_TOKEN: z.string().optional(),
    NEXT_PUBLIC_TINA_BRANCH: z.string().default('main'),
    NEXT_PUBLIC_TINA_SEARCH_TOKEN: z.string().optional(),
    // Analytics (optional)
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.NODE_ENV === 'production') {
      const requiredKeys: Array<keyof typeof values> = [
        'TINA_CLIENT_ID',
        'TINA_TOKEN',
        'NEXT_PUBLIC_TINA_CLIENT_ID',
        'NEXT_PUBLIC_TINA_TOKEN',
      ]

      requiredKeys.forEach((key) => {
        if (!values[key]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${key} is required in production to enable TinaCMS Cloud`,
            path: [key],
          })
        }
      })
    }
  })

const envParsed = envSchema.safeParse(process.env)

if (!envParsed.success) {
  console.error('❌ Invalid environment variables:', envParsed.error.flatten().fieldErrors)
  throw new Error('Invalid environment variables')
}

export const env = envParsed.data
