import { ShareAltOutlined } from '@ant-design/icons'
import { Button, Modal, QRCode, Tabs, TabsProps } from 'antd'
import { memo, useCallback, useMemo, type FC } from 'react'

import { useTabItems } from './hooks'
import styles from './style.module.scss'

const App: FC = memo(() => {
  const { tabItems } = useTabItems()

  const handleShareButtonClick = useCallback(() => {
    Modal.info({
      title: '二维码分享',
      content: (
        <div>
          <QRCode value={window.location.href} />
        </div>
      ),
    })
  }, [])

  const tabBarExtraContent = useMemo<TabsProps['tabBarExtraContent']>(() => {
    return {
      right: (
        <Button icon={<ShareAltOutlined />} onClick={handleShareButtonClick}>
          分享本站
        </Button>
      ),
    }
  }, [handleShareButtonClick])

  return (
    <div className={styles.app}>
      <div className={styles['app-wrapper']}>
        <Tabs defaultActiveKey="file" items={tabItems} tabBarExtraContent={tabBarExtraContent} />
      </div>
    </div>
  )
})

export default App
