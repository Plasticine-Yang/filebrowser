import { RegisterApisOptions } from './apis'

export type StartServerOptions = Partial<Pick<RegisterApisOptions, 'directoryToBrowse'>> & {
  /** 服务器运行端口 */
  port?: number
}
