'use client'

import { TinaCMS, TinaAdmin } from 'tinacms'
import { useMemo } from 'react'
import config from '../../../../tina/config'

export default function TinaWrapper() {
  const cms = useMemo(() => {
    const instance = new TinaCMS({
      enabled: true,
      clientId: config.clientId || '',
      branch: config.branch || 'main',
      token: config.token || '',
      schema: config.schema,
    } as any)
    return instance
  }, [])

  // Provide the CMS instance to children via context
  if (typeof window !== 'undefined') {
    ;(window as any).__TINA = cms
  }

  return <TinaAdmin config={config as any} />
}
