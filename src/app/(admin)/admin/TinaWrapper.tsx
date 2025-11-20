'use client'

import { TinaCMS } from 'tinacms'
import { TinaAdmin } from 'tinacms'
import { useMemo } from 'react'
import config from '../../../../tina/config'

// Create a simple context provider wrapper
const TinaCMSContext = require('tinacms').TinaCMSContext

export default function TinaWrapper() {
  const cms = useMemo(() => {
    return new TinaCMS({
      enabled: true,
      clientId: config.clientId || '',
      branch: config.branch || 'main',
      token: config.token || '',
      schema: config.schema,
    } as any)
  }, [])

  return (
    <TinaCMSContext.Provider value={{ cms }}>
      <TinaAdmin config={config as any} />
    </TinaCMSContext.Provider>
  )
}
