import { ClipboardHistory } from '@filebrowser/shared'
import { useBoolean } from 'ahooks'
import { message } from 'antd'
import { useCallback } from 'react'

export function useCopyClipboardHistory() {
  const [copying, { setTrue, setFalse }] = useBoolean(false)

  const handleCopyClipboardHistory = useCallback(
    async (clipboardHistory: ClipboardHistory) => {
      const { content } = clipboardHistory

      try {
        setTrue()
        await navigator.clipboard.writeText(content)
        message.success('复制成功')
      } catch (error) {
        message.error('复制失败')
        console.error(error)
      } finally {
        setFalse()
      }
    },
    [setFalse, setTrue],
  )

  return { copying, handleCopyClipboardHistory }
}
