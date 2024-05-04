import { useCallback, useState } from 'react'

import { FilesApiPath } from '@filebrowser/shared'

import { apiRequest } from '@/helpers'

import { useDirectoryPath } from './use-directory-path'
import { useFileInfoList } from './use-file-info-list'

interface UseUploadProps {
  pathForBackendApi: ReturnType<typeof useDirectoryPath>['pathForBackendApi']
  loadFileInfoList: ReturnType<typeof useFileInfoList>['loadFileInfoList']
}

export function useUpload(props: UseUploadProps) {
  const { pathForBackendApi, loadFileInfoList } = props

  const [uploading, setUploading] = useState(false)

  const handleUploadButtonClick = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'

    input.addEventListener('change', async (event) => {
      const eventTarget = event.target as HTMLInputElement
      const file = eventTarget.files?.item(0)

      if (file) {
        const formData = new FormData()
        formData.set('file', file)

        try {
          setUploading(true)

          await apiRequest.post(FilesApiPath.UploadFile, formData, {
            params: { subPath: pathForBackendApi ? pathForBackendApi : undefined },
          })

          loadFileInfoList(pathForBackendApi)
        } finally {
          setUploading(false)
        }
      }
    })

    input.click()
  }, [pathForBackendApi, loadFileInfoList])

  return { uploading, handleUploadButtonClick }
}
