import { useRequest } from 'ahooks'
import { useState } from 'react'

import { FileInfo, FilesApiPath, UniformResponse } from '@filebrowser/shared'

import { apiRequest } from '@/helpers'

export function useFileInfoList() {
  const [fileInfoList, setFileInfoList] = useState<FileInfo[]>([])

  const { run: loadFileInfoList, loading: fileInfoListLoading } = useRequest(
    async (subPath?: string) => {
      const response = await apiRequest.get<UniformResponse<FileInfo[]>>(FilesApiPath.GetFileInfoList, {
        params: {
          subPath: subPath ? subPath : undefined,
        },
      })
      const backendFileInfoList = response.data.data

      setFileInfoList(backendFileInfoList)
    },
    { manual: true },
  )

  return {
    fileInfoList,
    fileInfoListLoading,
    loadFileInfoList,
  }
}
