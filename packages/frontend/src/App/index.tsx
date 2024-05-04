import { Tabs } from 'antd'
import { memo, type FC } from 'react'

import { useTabItems } from './hooks'
import styles from './style.module.scss'

const App: FC = memo(() => {
  const { tabItems } = useTabItems()

  return (
    <div className={styles.app}>
      <div className={styles['app-wrapper']}>
        <Tabs defaultActiveKey="file" items={tabItems} />
      </div>
    </div>
  )
})

export default App
