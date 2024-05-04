import { networkInterfaces } from 'os'

export function getLocalIpList() {
  const localIpList: string[] = []
  const interfaceInfoMap = networkInterfaces()

  for (const interfaceInfoList of Object.values(interfaceInfoMap)) {
    if (interfaceInfoList) {
      for (const interfaceInfo of interfaceInfoList) {
        const { address, family } = interfaceInfo
        if (family === 'IPv4') {
          localIpList.push(address)
        }
      }
    }
  }

  return localIpList
}
