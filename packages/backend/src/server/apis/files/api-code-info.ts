import { defineApiCodeInfo } from '@/server/helpers'

export const FilesApiCodeInfo = defineApiCodeInfo({
  NotExists: { code: 1000, message: '目标路径不存在' },
  NotDirectory: { code: 1001, message: '目标路径不是目录' },
  NotFile: { code: 1002, message: '目标路径不是文件' },
  UploadFailed: { code: 1003, message: '上传失败' },
})
