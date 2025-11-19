export default function AdminPage() {
  // Redirect to the Tina Cloud admin
  if (typeof window !== 'undefined') {
    window.location.href = '/admin/index.html'
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bebas mb-4">Loading Tina CMS...</h1>
        <p className="text-gray-400">Redirecting to admin panel...</p>
      </div>
    </div>
  )
}
