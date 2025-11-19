'use client'

import { TinaCMS, TinaProvider, TinaAdmin } from 'tinacms'
import config from '../../../../tina/config'
import tinaClient from '../../../../tina/__generated__/client'
import { useMemo } from 'react'

export default function TinaWrapper() {
  const tinaGraphqlVersion = process.env.NEXT_PUBLIC_TINA_GRAPHQL_VERSION || '1.4'

  const cms = useMemo(() => {
    return new TinaCMS({
      ...(config as any),
      apis: {
        tina: tinaClient,
      },
    })
  }, [])

  return (
    <TinaProvider cms={cms}>
      <TinaAdmin config={config} />
    </TinaProvider>
  )
}
