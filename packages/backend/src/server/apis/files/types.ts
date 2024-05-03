export interface FileInfo {
  name: string
  size: number
  modifiedAt: number
  createdAt: number
  type?: 'file' | 'directory'
}

export interface RequestQuery {
  subPath?: string
}
