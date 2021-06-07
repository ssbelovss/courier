import * as types from './types'
import api from '../../api/user'
import { store } from '../index'
import { clearAuthData } from '../auth/actions'

function logOut() {
  setTimeout(()=>window.location.assign('/'), 1000)
  store.dispatch(clearAuthData())
  return {
    type: types.LOG_OUT
  }
}
  
function userGeo(params) {
  return {
    type: types.SET_USER_GEO,
    payload: params
  }
}

const setUserGeo = params => {
  store.dispatch(userGeo(params))
}

export {
  logOut,
  setUserGeo
}