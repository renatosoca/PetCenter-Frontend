import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { setStorage, STORAGE_NAMES } from '@/shared/utils'
import { useAppStateContext } from '@/store'
import { ModuleAuthPages } from '@/app/auth/domain'

const PrivateGuard = ({ children }: PropsWithChildren) => {
  const { user } = useAppStateContext()

  setStorage(STORAGE_NAMES.lastPage, window.location.pathname)

  return (
    <div>
      {!user && <Navigate to={ModuleAuthPages.signin} />}
      {user && children}
    </div>
  )
}

export default PrivateGuard
