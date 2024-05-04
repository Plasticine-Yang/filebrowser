import { useRequest } from 'ahooks'
import { useCallback } from 'react'

import { ClipboardApiPath, ClipboardHistory } from '@filebrowser/shared'

import { apiRequest } from '@/helpers'

interface UseDeleteClipboardHistoryProps {
  loadClipboardHistoryList: () => void
}

export function useDeleteClipboardHistory(props: UseDeleteClipboardHistoryProps) {
  const { loadClipboardHistoryList } = props

  const { loading: deleteing, run: deleteClipboardHistory } = useRequest(
    async (clipboardHistory: ClipboardHistory) => {
      const { id } = clipboardHistory

      await apiRequest.delete(`${ClipboardApiPath.Restful}/${id}`)

      loadClipboardHistoryList()
    },
    { manual: true },
  )

  const handleDeleteClipboardHistory = useCallback(
    (clipboardHistory: ClipboardHistory) => {
      deleteClipboardHistory(clipboardHistory)
    },
    [deleteClipboardHistory],
  )

  return { deleteing, handleDeleteClipboardHistory }
}
