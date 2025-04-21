import { getStorage, STORAGE_NAMES } from '@/shared/utils'
import { useAppStateContext } from '@/store'
import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { PatientModulePages } from '../../../app/patient/domain'

const PublicGuard = ({ children }: PropsWithChildren) => {
  const { user } = useAppStateContext()
  const lastPath = getStorage(STORAGE_NAMES.lastPage)

  return (
    <div>
      {!user && children}
      {user && <Navigate to={lastPath ?? PatientModulePages.home} />}
    </div>
  )
}

export default PublicGuard
