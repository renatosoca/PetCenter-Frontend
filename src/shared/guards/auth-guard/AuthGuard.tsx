import { getStorage, STORAGE_NAMES } from '@/shared/utils'
import { useAppStateContext } from '@/store'
import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { PatientModulePages } from '../../../app/patient/domain'

const AuthGuard = ({ children }: PropsWithChildren) => {
  const { user } = useAppStateContext()
  console.log(user)
  const lastPath = getStorage(STORAGE_NAMES.lastPage)

  return (
    <div>
      {!user && children}
      {user && <Navigate to={lastPath ?? PatientModulePages.home} />}
    </div>
  )
}

export default AuthGuard
