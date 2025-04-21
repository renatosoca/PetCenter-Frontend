import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { IValidation, TypeWithKey } from '@/domain'

export const useHandleForm = <T extends object>(initialForm: T, validations?: IValidation) => {
  const [params, setParams] = useState(initialForm)
  const [errors, setErrors] = useState<T | undefined>(undefined)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (isSubmitted) runValidations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  useEffect(() => {
    setParams(initialForm)
    setErrors(undefined)
    setIsSubmitted(false)
  }, [initialForm])

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = target

    setParams((prev) => ({ ...prev, [name]: value }))
  }

  const runValidations = (): boolean => {
    if (!validations) return true

    const newErrors = Object.entries(validations).reduce(
      (acc, [key, validate]) => {
        const value = params[key as keyof T] as string
        acc[key] = validate(value)
        return acc
      },
      {} as TypeWithKey<string | undefined>
    )

    setErrors(newErrors as T)

    return Object.values(newErrors).every((value) => !value)
  }

  const getFormValues = (e: FormEvent<HTMLFormElement>): T => {
    const formData = new FormData(e.currentTarget)

    return Object.fromEntries(formData.entries()) as T
  }

  const onSubmit = (callback: (formValues: T) => void) => {
    return (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsSubmitted(true)

      const isValid = runValidations()
      if (!isValid) return

      const values = structuredClone(getFormValues(e))
      callback(values)
    }
  }

  const resetForm = (reset: T) => {
    setParams(reset ?? initialForm)
    setErrors(undefined)
    setIsSubmitted(false)
  }

  return {
    params,
    errors,

    onSubmit,
    onInputChange,
    resetForm
  }
}
