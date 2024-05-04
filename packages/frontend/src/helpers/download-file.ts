export function downloadFile(downloadLink: string, filename: string) {
  const a = document.createElement('a')

  a.href = downloadLink
  a.download = filename
  a.click()
}
