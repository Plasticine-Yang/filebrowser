import { ClipboardHistory } from '@filebrowser/shared'
import { v4 as uuid } from 'uuid'

export function createClipboardHistoryManager() {
  let clipboardHistoryList: ClipboardHistory[] = []

  const getClipboardHistoryDescOrderedByCreatedAt = () => {
    return clipboardHistoryList.slice().sort((a, b) => b.createdAt - a.createdAt)
  }

  const createClipboardHistory = (content: string) => {
    clipboardHistoryList.push({ id: uuid(), content, createdAt: Date.now() })
  }

  const deleteClipboardHistory = (id: string) => {
    clipboardHistoryList = clipboardHistoryList.filter((clipboardHistory) => clipboardHistory.id !== id)
  }

  return { getClipboardHistoryDescOrderedByCreatedAt, createClipboardHistory, deleteClipboardHistory }
}
