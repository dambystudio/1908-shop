'use client'

import { TinaCMS, TinaAdmin } from 'tinacms'
import { useMemo } from 'react'

export default function AdminPage() {
  const cms = useMemo(() => {
    return new TinaCMS({
      clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
      token: process.env.NEXT_PUBLIC_TINA_TOKEN,
      branch: process.env.NEXT_PUBLIC_TINA_BRANCH || 'main',
      isLocalClient: false,
    })
  }, [])

  return <TinaAdmin cms={cms} />
}
