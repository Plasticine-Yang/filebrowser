import { TabsProps } from 'antd'
import { useMemo } from 'react'

import { ClipboardTab, FileTab } from '@/components'

export function useTabItems() {
  const tabItems = useMemo<TabsProps['items']>(
    () => [
      {
        key: 'file',
        label: '文件',
        children: <FileTab />,
      },
      {
        key: 'clipboard',
        label: '剪切板',
        children: <ClipboardTab />,
      },
    ],
    [],
  )

  return { tabItems }
}
