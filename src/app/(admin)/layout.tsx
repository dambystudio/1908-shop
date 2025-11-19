import type { Metadata } from 'next'
import './admin.css'

export const metadata: Metadata = {
  title: '1908 Shop Admin',
  description: 'Admin Dashboard',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}
