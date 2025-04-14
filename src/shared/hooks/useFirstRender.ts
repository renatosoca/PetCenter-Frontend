import { useEffect, useRef } from 'react'

export const useFirstRender = () => {
  const isFirstRender = useRef(true)

  useEffect(() => {
    isFirstRender.current = false
  }, [])

  return { isFirstRender: isFirstRender.current }
}
