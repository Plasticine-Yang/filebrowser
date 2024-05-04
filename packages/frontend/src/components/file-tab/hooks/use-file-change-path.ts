import { FileItemProps } from '@/components'
import { useCallback } from 'react'

import { useDirectoryPath } from './use-directory-path'

interface UseFileChangePathProps {
  changePath: ReturnType<typeof useDirectoryPath>['changePath']
}

export function useFileChangePath(props: UseFileChangePathProps) {
  const { changePath } = props

  const handleFileItemClick = useCallback<FileItemProps['onClick']>(
    (fileInfo) => {
      const { name, type } = fileInfo

      switch (type) {
        case 'file':
          break

        case 'directory':
          changePath(name)
          break

        default:
          break
      }
    },
    [changePath],
  )

  return { handleFileItemClick }
}
