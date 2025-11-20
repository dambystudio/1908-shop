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

  const missingEnv = !clientId || !token

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
