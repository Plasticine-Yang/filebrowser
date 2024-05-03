import { ApiCodeInfo } from './define-api-code-info'

export class BusinessError extends Error {
  public code: number

  constructor(apiCodeInfo: ApiCodeInfo, options?: ErrorOptions) {
    const { code, message } = apiCodeInfo

    super(message, options)
    this.code = code
  }
}
