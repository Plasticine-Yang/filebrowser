import { useEffect } from 'react'

import { useDirectoryPath } from './use-directory-path'
import { useFileInfoList } from './use-file-info-list'

interface UseLinkDirectoryPathAndFileInfoListProps {
  pathForBackendApi: ReturnType<typeof useDirectoryPath>['pathForBackendApi']
  loadFileInfoList: ReturnType<typeof useFileInfoList>['loadFileInfoList']
}

export function useLinkDirectoryPathAndFileInfoList(props: UseLinkDirectoryPathAndFileInfoListProps) {
  const { pathForBackendApi, loadFileInfoList } = props

  useEffect(() => {
    loadFileInfoList(pathForBackendApi)
  }, [pathForBackendApi, loadFileInfoList])
}
