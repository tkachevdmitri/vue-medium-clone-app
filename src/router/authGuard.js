import { getItem } from '../helpers/helpersLocalStorage'

export default function (to, from, next) {
  const token = getItem('jwtToken')
  if (to.meta.auth && !token) {
    next('/login')
  } else {
    next()
  }
}
