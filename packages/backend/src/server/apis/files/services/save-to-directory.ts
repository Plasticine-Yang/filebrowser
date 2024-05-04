import type { MultipartFile } from '@fastify/multipart'
import { createWriteStream } from 'fs'
import { join } from 'path'

export function saveToDirectory(directoryPath: string, multipart: MultipartFile) {
  const filePathToSave = join(directoryPath, multipart.filename)

  multipart.file.pipe(createWriteStream(filePathToSave))
}
