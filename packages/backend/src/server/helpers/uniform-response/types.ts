export interface UniformResponse<T> {
  code: number
  message: string
  data: T
}
