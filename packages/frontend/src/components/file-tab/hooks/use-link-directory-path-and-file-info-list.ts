import { useEffect } from 'react'

import { ROOT_DIRECTORY } from '../constants'
import { useDirectoryPath } from './use-directory-path'
import { useFileInfoList } from './use-file-info-list'

interface UseLinkDirectoryPathAndFileInfoListProps {
  path: ReturnType<typeof useDirectoryPath>['path']
  loadFileInfoList: ReturnType<typeof useFileInfoList>['loadFileInfoList']
}

export function useLinkDirectoryPathAndFileInfoList(props: UseLinkDirectoryPathAndFileInfoListProps) {
  const { path, loadFileInfoList } = props

  useEffect(() => {
    const subPath = path.filter((directory) => directory !== ROOT_DIRECTORY).join('/')

    loadFileInfoList(subPath)
  }, [path, loadFileInfoList])
}
