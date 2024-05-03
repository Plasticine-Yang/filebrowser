import { SUCCESS_CODE, SUCCESS_MESSAGE } from '@/server/constants'
import type { UniformResponse } from './types'

export function createUniformResponse<T>(data: T, code?: number, message?: string): UniformResponse<T> {
  return {
    code: code ?? SUCCESS_CODE,
    message: message ?? SUCCESS_MESSAGE,
    data,
  }
}

export type { UniformResponse } from './types'
