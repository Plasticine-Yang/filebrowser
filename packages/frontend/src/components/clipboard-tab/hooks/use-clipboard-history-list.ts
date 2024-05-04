import { useRequest } from 'ahooks'
import { useState } from 'react'

import { ClipboardApiPath, ClipboardHistory, UniformResponse } from '@filebrowser/shared'

import { apiRequest } from '@/helpers'

export function useClipboardHistoryList() {
  const [clipboardHistoryList, setClipboardHistoryList] = useState<ClipboardHistory[]>([])

  const { loading: clipboardHistoryLoading, run: loadClipboardHistoryList } = useRequest(
    async () => {
      const response = await apiRequest.get<UniformResponse<ClipboardHistory[]>>(ClipboardApiPath.Restful)
      const backendClipboardList = response.data.data

      setClipboardHistoryList(backendClipboardList)
    },
    { manual: true },
  )

  return {
    clipboardHistoryLoading,
    clipboardHistoryList,
    loadClipboardHistoryList,
  }
}
