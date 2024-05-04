import { Breadcrumb, Tag } from 'antd'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { memo, useCallback, useMemo, type FC } from 'react'

interface DirectoryPathProps {
  path: string[]
  onChange: (directory: string) => void
}

export const DirectoryPath: FC<DirectoryPathProps> = memo((props) => {
  const { path, onChange } = props

  const handleItemClick = useCallback(
    (directory: string) => {
      onChange(directory)
    },
    [onChange],
  )

  const items = useMemo<ItemType[]>(() => {
    return path.map<ItemType>((directory) => {
      return { title: <Tag style={{ cursor: 'pointer' }}>{directory}</Tag>, onClick: () => handleItemClick(directory) }
    })
  }, [path, handleItemClick])

  return <Breadcrumb items={items} />
})
