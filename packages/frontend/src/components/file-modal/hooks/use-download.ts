import { useCallback } from 'react'

import { downloadFile } from '@/helpers'

interface UseDownloadProps {
  downloadLink: string
  filename: string
}

export function useDownload(props: UseDownloadProps) {
  const { downloadLink, filename } = props

  const handleDownload = useCallback(() => {
    downloadFile(downloadLink, filename)
  }, [downloadLink, filename])

  return { handleDownload }
}
