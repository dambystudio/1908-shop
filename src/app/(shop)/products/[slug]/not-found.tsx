import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Prodotto non trovato</h1>
      <p className="text-gray-400 mb-8">
        Il prodotto che stai cercando non esiste o non è più disponibile.
      </p>
      <Button asChild>
        <Link href="/products">Torna ai prodotti</Link>
      </Button>
    </div>
  )
}
