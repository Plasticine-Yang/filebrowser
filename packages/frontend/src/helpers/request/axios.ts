import axios from 'axios'

import { BACKEND_API_BASE_URL } from './constants'

export const apiRequest = axios.create({ baseURL: BACKEND_API_BASE_URL })
