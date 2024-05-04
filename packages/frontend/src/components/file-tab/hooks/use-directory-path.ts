import { produce } from 'immer'
import { useCallback, useState } from 'react'

import { ROOT_DIRECTORY } from '../constants'

export function useDirectoryPath() {
  const [path, setPath] = useState<string[]>([ROOT_DIRECTORY])

  const changePath = useCallback((directory: string) => {
    setPath((prevPath) =>
      produce(prevPath, (draft) => {
        // 跳转到路径中已有的目录
        if (draft.includes(directory)) {
          const directoryIndex = draft.findIndex((currentDirectory) => currentDirectory === directory)
          return draft.slice(0, directoryIndex + 1)
        }

        // 跳转到路径中没有的目录 - 末尾追加
        draft.push(directory)
      }),
    )
  }, [])

  return { path, changePath }
}
