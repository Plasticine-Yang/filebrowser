import { Button, Input, Modal, QRCode, Space } from 'antd'
import { memo, useMemo, type FC } from 'react'

import { BACKEND_API_BASE_URL } from '@/helpers/request/constants'
import { FileInfo } from '@filebrowser/shared'
import { useDownload } from './hooks'

interface FileModalProps {
  open: boolean
  currentDirectoryPath: string
  currentFileInfo?: FileInfo
  onClose: () => void
}

export const FileModal: FC<FileModalProps> = memo((props) => {
  const { open, currentFileInfo, currentDirectoryPath, onClose } = props

  const filename = useMemo(() => currentFileInfo?.name ?? 'unknown', [currentFileInfo?.name])
  const currentFilePath = useMemo(() => `${currentDirectoryPath}/${filename}`, [currentDirectoryPath, filename])
  const downloadLink = useMemo(
    () => `${BACKEND_API_BASE_URL}/files/download?subPath=${currentFilePath}`,
    [currentFilePath],
  )

  const { handleDownload } = useDownload({ downloadLink, filename })

  return (
    <Modal centered title={filename} open={open} closable={false} onCancel={onClose} onOk={onClose}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space.Compact style={{ width: '100%' }}>
          <Input contentEditable={false} value={downloadLink} />
          <Button type="primary" onClick={handleDownload}>
            下载
          </Button>
        </Space.Compact>

        <QRCode value={downloadLink} />
      </Space>
    </Modal>
  )
})
