'use client'

import dynamic from 'next/dynamic'

const TinaWrapper = dynamic(() => import('./TinaWrapper'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-gray-400">Caricamento dashboard...</p>
    </div>
  ),
})

export default function AdminPage() {
  const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID
  const token = process.env.NEXT_PUBLIC_TINA_TOKEN
  const isProduction = process.env.NODE_ENV === 'production'

  const missingEnv = !clientId || !token

  // In production, show authentication required message
  if (isProduction) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-xl space-y-4 text-center">
          <h1 className="text-2xl font-semibold text-red-500">Editor Amministrazione</h1>
          <p className="text-gray-300">
            L&apos;editor visivo TinaCMS è disponibile solo in locale per motivi di sicurezza.
          </p>
          <div className="text-sm text-gray-400 space-y-2 text-left bg-gray-900 p-4 rounded-lg">
            <p className="font-semibold text-white">Per modificare i contenuti:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Clona il repository in locale</li>
              <li>
                Esegui <code className="bg-black px-2 py-0.5 rounded">pnpm dev</code>
              </li>
              <li>
                Vai su <code className="bg-black px-2 py-0.5 rounded">localhost:3000/admin</code>
              </li>
              <li>Modifica i contenuti e pusha su GitHub</li>
            </ol>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Questo approccio garantisce che solo sviluppatori autorizzati possano modificare i
            contenuti.
          </p>
        </div>
      </div>
    )
  }

  if (missingEnv) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-xl space-y-4 text-center">
          <h1 className="text-2xl font-semibold text-red-500">TinaCMS non è configurato</h1>
          <p className="text-gray-300">
            Per abilitare l&apos;editor visivo sul sito live devi impostare le variabili ambiente
            Tina Cloud anche su Vercel. Aggiungi i valori forniti da{' '}
            <a
              href="https://app.tina.io/"
              className="text-red-500 underline"
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

  return <TinaWrapper />
}
