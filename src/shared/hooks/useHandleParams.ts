import { ChangeEvent, useState } from 'react'

export const useHandleParams = <T extends object>(initState: T, reset: (values: T) => void) => {
  const [params, setParams] = useState<T>(initState)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setParams((prev) => ({ ...prev, [name]: value }))
  }

  const handleReset = () => {
    setParams(initState)
    reset(initState)
  }

  return { params, setParams, handleChange, handleReset }
}
