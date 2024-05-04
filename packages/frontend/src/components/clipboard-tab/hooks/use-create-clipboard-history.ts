import { useRequest } from 'ahooks'
import { ChangeEventHandler, useCallback, useState } from 'react'

import { ClipboardApiPath, CreateClipboardHistoryRequest } from '@filebrowser/shared'

import { apiRequest } from '@/helpers'

interface UseCreateClipboardHistoryProps {
  loadClipboardHistoryList: () => void
}

export function useCreateClipboardHistory(props: UseCreateClipboardHistoryProps) {
  const { loadClipboardHistoryList } = props

  const [clipboardInputValue, setClipboardInputValue] = useState('')

  const { loading: clipboardHistoryCreating, run: createClipboardHistory } = useRequest(
    async () => {
      await apiRequest.post(ClipboardApiPath.Restful, { content: clipboardInputValue } as CreateClipboardHistoryRequest)

      setClipboardInputValue('')
      loadClipboardHistoryList()
    },
    {
      manual: true,
    },
  )

  const handleClipboardInputValueChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    const nextInputValue = event.target.value

    setClipboardInputValue(nextInputValue)
  }, [])

  const handleCreateClipboardHistory = useCallback(() => {
    createClipboardHistory()
  }, [createClipboardHistory])

  return {
    clipboardHistoryCreating,
    clipboardInputValue,
    handleClipboardInputValueChange,
    handleCreateClipboardHistory,
  }
}
