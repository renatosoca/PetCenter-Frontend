import { PropsWithChildren, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const NotFoundPage = lazy(() => import('./not-found/404'))

const RouteWithNotFound = ({ children }: PropsWithChildren) => {
  return (
    <Routes>
      {children}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default RouteWithNotFound
