import { useState } from 'react'

import { FileInfo } from '@filebrowser/shared'
import { useBoolean } from 'ahooks'

export function useFileModal() {
  const [open, { setTrue: openModal, setFalse: closeModal }] = useBoolean(false)
  const [currentFileInfo, setCurrentFileInfo] = useState<FileInfo>()

  return {
    open,
    currentFileInfo,
    setCurrentFileInfo,
    openModal,
    closeModal,
  }
}
