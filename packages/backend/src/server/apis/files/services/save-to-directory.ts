import type { MultipartFile } from '@fastify/multipart'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function saveToDirectory(directoryPath: string, multipart: MultipartFile) {
  const filePathToSave = join(directoryPath, multipart.filename)

  await writeFile(filePathToSave, multipart.file)
}
