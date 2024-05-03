import type { ApiCodeInfo } from './types'

export function defineApiCodeInfo<T extends Record<string, ApiCodeInfo>>(apiCodeInfoMap: T): T {
  return apiCodeInfoMap
}

export type { ApiCodeInfo } from './types'
