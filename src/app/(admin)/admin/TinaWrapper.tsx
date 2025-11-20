'use client'

import { TinaCMS } from 'tinacms'
import { TinaAdmin } from 'tinacms'
import { useMemo } from 'react'
import config from '../../../../tina/config'

export default function TinaWrapper() {
  const cms = useMemo(() => {
    return new TinaCMS({
      enabled: true,
      ...(config as any),
    })
  }, [])

  return <TinaAdmin cms={cms} />
}
