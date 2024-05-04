import { BACKEND_PORT } from '@filebrowser/shared'

const { protocol, hostname } = window.location

export const BACKEND_API_BASE_URL = `${protocol}//${hostname}:${BACKEND_PORT}`
