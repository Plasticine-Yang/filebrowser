import { memo, type FC } from 'react'

import { Button, Col, Row, Space, Spin } from 'antd'

import { DirectoryPath } from '../directory-path'
import { FileItem } from '../file-item'
import { FileModal } from '../file-modal'
import {
  useDirectoryPath,
  useFileInfoList,
  useFileItem,
  useFileModal,
  useLinkDirectoryPathAndFileInfoList,
  useUpload,
} from './hooks'

export const FileTab: FC = memo(() => {
  const { path, pathForBackendApi, changePath } = useDirectoryPath()
  const { fileInfoList, fileInfoListLoading, loadFileInfoList } = useFileInfoList()
  const { open, currentFileInfo, setCurrentFileInfo, openModal, closeModal } = useFileModal()
  const { handleFileItemClick } = useFileItem({ changePath, setCurrentFileInfo, openModal })
  const { uploading, handleUploadButtonClick } = useUpload({ pathForBackendApi, loadFileInfoList })

  useLinkDirectoryPathAndFileInfoList({ pathForBackendApi, loadFileInfoList })

  return (
    <>
      <Space direction="vertical" size="middle" style={{ width: '100%', paddingBottom: '2em' }}>
        <Button type="primary" onClick={handleUploadButtonClick}>
          上传文件
        </Button>

        <DirectoryPath path={path} onChange={changePath} />

        {fileInfoListLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Spin />
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {fileInfoList.map((fileInfo) => (
              <Col key={fileInfo.name} xs={12} sm={8} md={6} lg={4} xl={3}>
                <FileItem fileInfo={fileInfo} onClick={handleFileItemClick} />
              </Col>
            ))}
          </Row>
        )}
      </Space>

      <FileModal
        open={open}
        currentFileInfo={currentFileInfo}
        currentDirectoryPath={pathForBackendApi}
        onClose={closeModal}
      />

      <Spin fullscreen spinning={uploading} />
    </>
  )
})
