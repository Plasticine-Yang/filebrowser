import type { StartServerOptions } from '../types'

export const DEFAULT_START_SERVER_OPTIONS: Required<StartServerOptions> = {
  port: 8080,
  root: process.cwd(),
}
