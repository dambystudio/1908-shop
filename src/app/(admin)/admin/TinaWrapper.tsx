'use client'

import TinaCMSProvider from 'tinacms'
import { TinaAdmin } from 'tinacms'
import config from '../../../../tina/config'
import tinaClient from '../../../../tina/__generated__/client'

export default function TinaWrapper() {
  const tinaGraphqlVersion = process.env.NEXT_PUBLIC_TINA_GRAPHQL_VERSION || '1.4'
  const providerConfig = config as unknown as Record<string, unknown>

  return (
    <TinaCMSProvider
      {...(providerConfig as any)}
      client={tinaClient}
      tinaGraphQLVersion={tinaGraphqlVersion}
    >
      <TinaAdmin config={config} />
    </TinaCMSProvider>
  )
}
