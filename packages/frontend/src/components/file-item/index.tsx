import { FileOutlined, FileUnknownOutlined, FolderOutlined } from '@ant-design/icons'
import { Card, Space, Typography } from 'antd'
import { CSSProperties, memo, useCallback, useMemo, type FC } from 'react'

import { FileInfo } from '@filebrowser/shared'

export interface FileItemProps {
  fileInfo: FileInfo
  onClick: (fileInfo: FileInfo) => void
}

export const FileItem: FC<FileItemProps> = memo((props) => {
  const { fileInfo, onClick } = props
  const { name, type } = fileInfo

  const icon = useMemo(() => {
    const sharedStyle: CSSProperties = { fontSize: '5em' }

    switch (type) {
      case 'file':
        return <FileOutlined style={{ ...sharedStyle, color: '#003554' }} />

      case 'directory':
        return <FolderOutlined style={{ ...sharedStyle, color: '#00A6FB' }} />

      default:
        return <FileUnknownOutlined style={sharedStyle} />
    }
  }, [type])

  const handleClick = useCallback(() => {
    onClick(fileInfo)
  }, [fileInfo, onClick])

  return (
    <Card hoverable onClick={handleClick}>
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        {icon}
        <Typography.Text ellipsis={{ tooltip: name }}>{name}</Typography.Text>
      </Space>
    </Card>
  )
})
