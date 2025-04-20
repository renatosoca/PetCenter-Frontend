export interface IValidation {
  [key: string]: (value: string) => string | undefined
}
