import { Button, TableColumnsType } from 'antd'
import { useMemo } from 'react'
import dayjs from 'dayjs'

import { ClipboardHistory } from '@filebrowser/shared'

import { useClearClipboardHistory } from './use-clear-clipboard-history'
import { useClipboardHistoryList } from './use-clipboard-history-list'
import { useCopyClipboardHistory } from './use-copy-clipboard-history'
import { useCreateClipboardHistory } from './use-create-clipboard-history'
import { useDeleteClipboardHistory } from './use-delete-clipboard-history'

export function useClipboardHistory() {
  const { clipboardHistoryList, clipboardHistoryLoading, loadClipboardHistoryList } = useClipboardHistoryList()
  const {
    clipboardHistoryCreating,
    clipboardInputValue,
    handleClipboardInputValueChange,
    handleCreateClipboardHistory,
  } = useCreateClipboardHistory({ loadClipboardHistoryList })
  const { deleteing, handleDeleteClipboardHistory } = useDeleteClipboardHistory({ loadClipboardHistoryList })
  const { clipboardHistoryListClearing, handleClearClipboardHistoryList } = useClearClipboardHistory({
    loadClipboardHistoryList,
  })
  const { copying, handleCopyClipboardHistory } = useCopyClipboardHistory()

  const tableColumns = useMemo<TableColumnsType<ClipboardHistory>>(() => {
    return [
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        render: (_, { content }) => <span style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{content}</span>,
      },
      {
        title: '时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render: (_, { createdAt }) => {
          const formatTime = dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')

          return <span style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{formatTime}</span>
        },
      },
      {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: '10em',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render: (_, record) => (
          <Button.Group>
            <Button danger type="primary" loading={deleteing} onClick={() => handleDeleteClipboardHistory(record)}>
              删除
            </Button>

            <Button type="primary" loading={copying} onClick={() => handleCopyClipboardHistory(record)}>
              复制
            </Button>
          </Button.Group>
        ),
      },
    ]
  }, [copying, deleteing, handleCopyClipboardHistory, handleDeleteClipboardHistory])

  return {
    tableColumns,
    clipboardHistoryList,
    clipboardHistoryLoading,
    clipboardHistoryCreating,
    clipboardHistoryListClearing,
    clipboardInputValue,
    loadClipboardHistoryList,
    handleClipboardInputValueChange,
    handleCreateClipboardHistory,
    handleClearClipboardHistoryList,
  }
}
