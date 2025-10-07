export function Header() {
  return (
    <header className="border-b border-gray-800 bg-bg-black">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-red">1908 Shop</h1>
          <div className="flex gap-6 text-sm">
            <a href="/" className="hover:text-primary-red transition-colors">
              Home
            </a>
            <a href="/products" className="hover:text-primary-red transition-colors">
              Prodotti
            </a>
            <a href="/mystery-box" className="hover:text-primary-red transition-colors">
              Mystery Box
            </a>
            <a href="/reviews" className="hover:text-primary-red transition-colors">
              Recensioni
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
