import { defineApiCodeInfo } from '@/server/helpers'

export const FilesApiCodeInfo = defineApiCodeInfo({
  NotExists: { code: 1000, message: '目标路径不存在' },
  NotDirectory: { code: 1001, message: '目标路径不是目录，无法获取文件列表' },
})
