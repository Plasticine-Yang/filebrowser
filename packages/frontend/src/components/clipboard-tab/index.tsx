import { useMount } from 'ahooks'
import { Button, Divider, Flex, Input, Space, Table } from 'antd'
import { memo, type FC } from 'react'

import { useClipboardHistory } from './hooks'

export const ClipboardTab: FC = memo(() => {
  const {
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
  } = useClipboardHistory()

  useMount(() => {
    loadClipboardHistoryList()
  })

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Input.TextArea
        placeholder="请输入..."
        value={clipboardInputValue}
        style={{ height: '20em' }}
        onChange={handleClipboardInputValueChange}
      />

      <Flex justify="flex-end">
        <Button type="primary" loading={clipboardHistoryCreating} onClick={() => handleCreateClipboardHistory()}>
          创建
        </Button>
      </Flex>

      <Divider />

      <Flex>
        <Button
          danger
          type="primary"
          loading={clipboardHistoryListClearing}
          onClick={() => handleClearClipboardHistoryList()}
        >
          清空剪切板历史记录
        </Button>
      </Flex>

      <Table loading={clipboardHistoryLoading} columns={tableColumns} dataSource={clipboardHistoryList} />
    </Space>
  )
})
