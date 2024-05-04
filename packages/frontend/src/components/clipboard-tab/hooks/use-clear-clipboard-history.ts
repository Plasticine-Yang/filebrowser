import { useRequest } from 'ahooks'
import { useCallback } from 'react'

import { ClipboardApiPath } from '@filebrowser/shared'

import { apiRequest } from '@/helpers'

interface UseClearClipboardHistoryProps {
  loadClipboardHistoryList: () => void
}

export function useClearClipboardHistory(props: UseClearClipboardHistoryProps) {
  const { loadClipboardHistoryList } = props

  const { loading: clipboardHistoryListClearing, run: clearClipboardHistoryList } = useRequest(
    async () => {
      await apiRequest.delete(ClipboardApiPath.Restful)

      loadClipboardHistoryList()
    },
    { manual: true },
  )

  const handleClearClipboardHistoryList = useCallback(() => {
    clearClipboardHistoryList()
  }, [clearClipboardHistoryList])

  return { clipboardHistoryListClearing, handleClearClipboardHistoryList }
}
