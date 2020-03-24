import ky from 'ky-universal'
import { apiURL } from './constants/api'

export default ky.extend({
  prefixUrl: apiURL,
  throwHttpErrors: false
})
