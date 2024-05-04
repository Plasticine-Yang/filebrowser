import { memo, type FC } from 'react'

import { Col, Row, Space, Spin } from 'antd'

import { DirectoryPath } from '../directory-path'
import { FileItem } from '../file-item'
import { useDirectoryPath, useFileChangePath, useFileInfoList, useLinkDirectoryPathAndFileInfoList } from './hooks'

interface FileTabProps {}

export const FileTab: FC<FileTabProps> = memo((props) => {
  const { path, changePath } = useDirectoryPath()
  const { fileInfoList, fileInfoListLoading, loadFileInfoList } = useFileInfoList()
  const { handleFileItemClick } = useFileChangePath({ changePath })

  useLinkDirectoryPathAndFileInfoList({ path, loadFileInfoList })

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%', paddingBottom: '2em' }}>
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
  )
})
