export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-bg-black mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} 1908 Shop. Attività non ufficiale.
          </p>
          <p className="text-xs text-gray-600">
            Disclaimer: Questo è un sito vetrina. Gli ordini vengono completati tramite Instagram
            DM.
          </p>
        </div>
      </div>
    </footer>
  )
}
