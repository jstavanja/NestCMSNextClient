import api from '../api'
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from '../constants/auth'

export default {
  current: () =>
    api
      .get('user', {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem(
            LOCAL_STORAGE_JWT_TOKEN_KEY
          )}`
        }
      })
      .json(),
  login: (username, password) =>
    api.post('login', { json: { username, password } }),
  register: (username, email, password) =>
    api.post('register', { json: { username, email, password } })
}
