import type { UniformResponse } from '@filebrowser/shared'

import { SUCCESS_CODE, SUCCESS_MESSAGE } from '@/server/constants'

export function createUniformResponse<T>(data: T, code?: number, message?: string): UniformResponse<T> {
  return {
    code: code ?? SUCCESS_CODE,
    message: message ?? SUCCESS_MESSAGE,
    data,
  }
}
