'use client'

import TinaCMSProvider from 'tinacms'
import { TinaAdmin } from 'tinacms'
import config from '../../../../tina/config'
import tinaClient from '../../../../tina/__generated__/client'

export default function TinaWrapper() {
  return (
    <TinaCMSProvider {...(config as any)} client={tinaClient}>
      <TinaAdmin config={config as any} />
    </TinaCMSProvider>
  )
}
