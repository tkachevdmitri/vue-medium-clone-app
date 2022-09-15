import axios from 'axios'
import { getItem } from '../helpers/helpersLocalStorage'

const instance = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
})

function setAutorizationToken(request) {
  const tokenValue = getItem('jwtToken')
  const token = tokenValue ? `Token ${tokenValue}` : ''
  request.headers.authorization = token
  return request
}

instance.interceptors.request.use(setAutorizationToken)

export default instance
