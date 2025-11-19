'use client'

import { TinaCMS, TinaProvider, TinaAdmin } from 'tinacms'
import config from '../../../../tina/config'
import tinaClient from '../../../../tina/__generated__/client'
import { useMemo } from 'react'

export default function TinaWrapper() {
  const cms = useMemo(() => {
    const cmsInstance = new TinaCMS({
      enabled: true,
      sidebar: true,
      clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
      media: config.media as any,
    })

    // Explicitly register the API to prevent "fetchCollections" errors
    cmsInstance.registerApi('tina', tinaClient)

    return cmsInstance
  }, [])

  return (
    <TinaProvider cms={cms}>
      <TinaAdmin config={config} />
    </TinaProvider>
  )
}
