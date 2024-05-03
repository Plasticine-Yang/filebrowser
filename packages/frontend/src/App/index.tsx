import { memo, useMemo, type FC } from 'react'
import { Tabs, TabsProps } from 'antd'

import { ClipboardTab, FileTab } from '@/components'

import styles from './style.module.scss'

const App: FC = memo(() => {
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

  return (
    <div className={styles.app}>
      <div className={styles['app-wrapper']}>
        <Tabs defaultActiveKey="file" items={tabItems} />
      </div>
    </div>
  )
})

export default App
