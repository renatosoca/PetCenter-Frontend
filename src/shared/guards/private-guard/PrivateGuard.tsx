import { PropsWithChildren } from 'react'
import { useAppStateContext } from '@/store'
import { setStorage, STORAGE_NAMES } from '@/shared/utils'

const PrivateGuard = ({ children }: PropsWithChildren) => {
  const { user } = useAppStateContext()
  console.log(user)

  setStorage(STORAGE_NAMES.lastPage, window.location.pathname)

  return (
    <div>
      {!user && <p>Welcome back!</p>}
      {user && children}
    </div>
  )
}

export default PrivateGuard
