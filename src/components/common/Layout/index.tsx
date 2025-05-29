import { useLocation } from 'react-router-dom'
import { Navigation } from '../Navigation/navigation'
import Footer from '../Footer/footer'
import { isAuthRoute } from '@/utils/auth-routes'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  const isAuth = isAuthRoute(pathname)

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuth && <Navigation />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAuth && <Footer />}
    </div>
  )
}