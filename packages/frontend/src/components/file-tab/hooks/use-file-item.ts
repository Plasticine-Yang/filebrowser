import { FileItemProps } from '@/components'
import { useCallback } from 'react'

import { useDirectoryPath } from './use-directory-path'
import { useFileModal } from './use-file-modal'

interface UseFileChangePathProps {
  changePath: ReturnType<typeof useDirectoryPath>['changePath']
  setCurrentFileInfo: ReturnType<typeof useFileModal>['setCurrentFileInfo']
  openModal: ReturnType<typeof useFileModal>['openModal']
}

export function useFileItem(props: UseFileChangePathProps) {
  const { changePath, setCurrentFileInfo, openModal } = props

  const handleFileItemClick = useCallback<FileItemProps['onClick']>(
    (fileInfo) => {
      const { name, type } = fileInfo

      switch (type) {
        case 'file':
          setCurrentFileInfo(fileInfo)
          openModal()
          break

        case 'directory':
          changePath(name)
          break

        default:
          break
      }
    },
    [changePath, openModal, setCurrentFileInfo],
  )

  return { handleFileItemClick }
}
