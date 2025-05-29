export const authRoutes = ['/login', '/signup', '/forgot']

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some(route => pathname === route)
}