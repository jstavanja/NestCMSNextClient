import ky from 'ky-universal'
import { apiURL } from './constants/api'
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from './constants/auth'

const createApi = () => {
  const config = {
    prefixUrl: apiURL,
    throwHttpErrors: true,
  }

  if (typeof window !== 'undefined') {
    // Check whether we are on the client-side
    const savedJWT = window.localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)

    config.headers = {
			authorization: `Bearer ${savedJWT}`
		}
  }

  return ky.create(config)
}

export default createApi()
