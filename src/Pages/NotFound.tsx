import { Link } from "react-router-dom"

import { ArrowLeft, Tv } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Header with Logo */}
      <header className="p-6 md:p-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <Tv className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-medium text-blue-600">Kool Ai</span>
        </div>
      </header>

      {/* 404 Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[400px] font-bold text-gray-100 select-none leading-none">
        4<br />0<br />4
      </div>

      {/* Main Content */}
      <main className="relative z-10 px-8 md:px-16 lg:px-24 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <div className="space-y-6 pt-12">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-gray-900">Ooops...</h1>
              <h2 className="text-4xl font-medium text-gray-800">Page Not Found</h2>
            </div>

            <div className="space-y-1 text-gray-600 max-w-md">
              <p>Sorry, the content you're looking for doesn't exist.</p>
              <p>Either it was removed, or you mistyped the link.</p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Home
            </Link>
          </div>

          {/* Right Illustration */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-blue-50 rounded-full w-64 h-64 mx-auto flex items-center justify-center">
                <img
                  src="/images/disconnected-cables.png"
                  alt="Disconnected cables illustration"
                  width={300}
                  height={300}
                  className="w-auto h-auto"
                  
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
