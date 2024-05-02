import { startServer } from './server'

async function main() {
  await startServer({ port: 6666 })
}

main()
