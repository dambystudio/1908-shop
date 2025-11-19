'use client'

import { useEffect, useState } from 'react'
import config from '../../../../tina/config'
import tinaClient from '../../../../tina/__generated__/client'

type TinaAdminComponent = (props: { config: typeof config }) => JSX.Element
type TinaCMSProviderComponent = (props: any) => JSX.Element

export default function AdminPage() {
  const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID
  const token = process.env.NEXT_PUBLIC_TINA_TOKEN

  const missingEnv = !clientId || !token
  const [components, setComponents] = useState<{
    TinaAdmin: TinaAdminComponent
    TinaCMSProvider: TinaCMSProviderComponent
  } | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    if (missingEnv) return

    let mounted = true
    import('tinacms')
      .then((mod) => {
        if (mounted) {
          setComponents({
            TinaAdmin: mod.TinaAdmin,
            TinaCMSProvider: mod.default as unknown as TinaCMSProviderComponent,
          })
        }
      })
      .catch((error: unknown) => {
        console.error('Failed to load TinaAdmin', error)
        if (mounted) {
          const message = error instanceof Error ? error.message : 'Errore sconosciuto'
          setLoadError(message)
        }
      })

    return () => {
      mounted = false
    }
  }, [missingEnv])

  if (missingEnv) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-xl space-y-4 text-center">
          <h1 className="text-2xl font-semibold text-primary-red">TinaCMS non è configurato</h1>
          <p className="text-gray-300">
            Per abilitare l&apos;editor visivo sul sito live devi impostare le variabili ambiente
            Tina Cloud anche su Vercel. Aggiungi i valori forniti da{' '}
            <a
              href="https://app.tina.io/"
              className="text-primary-red underline"
              target="_blank"
              rel="noreferrer"
            >
              app.tina.io
            </a>{' '}
            con i nomi:
          </p>
          <ul className="text-left text-gray-200 list-disc list-inside">
            <li>NEXT_PUBLIC_TINA_CLIENT_ID</li>
            <li>NEXT_PUBLIC_TINA_TOKEN</li>
            <li>NEXT_PUBLIC_TINA_BRANCH (opzionale, default main)</li>
            <li>TINA_CLIENT_ID</li>
            <li>TINA_TOKEN</li>
            <li>TINA_BRANCH</li>
          </ul>
          <p className="text-gray-400 text-sm">
            Una volta salvate su Vercel, riesegui un deploy per attivare la dashboard.
          </p>
        </div>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-xl space-y-4 text-center">
          <h1 className="text-2xl font-semibold text-primary-red">Errore caricando TinaCMS</h1>
          <p className="text-gray-300">{loadError}</p>
          <p className="text-gray-400 text-sm">
            Controlla la console del browser e verifica che le credenziali Tina Cloud e gli accessi
            API siano corretti.
          </p>
        </div>
      </div>
    )
  }

  const tinaGraphqlVersion = process.env.NEXT_PUBLIC_TINA_GRAPHQL_VERSION || '1.4'

  if (!components) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Caricamento dashboard...</p>
      </div>
    )
  }

  const { TinaAdmin, TinaCMSProvider } = components
  const providerConfig = config as unknown as Record<string, unknown>

  return (
    <TinaCMSProvider
      {...providerConfig}
      client={tinaClient}
      tinaGraphQLVersion={tinaGraphqlVersion}
    >
      <TinaAdmin config={config} />
    </TinaCMSProvider>
  )
}
