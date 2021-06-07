import axios from 'axios'
import { apiMachinesUrl } from './config'
import { store } from '../reducers'

const Server = axios.create({
  baseURL: apiMachinesUrl,
  responseType: 'json',
  withCredentials: true
});

const indx = (process && process.env && process.env.NODE_ENV === 'development') ? '/index.php' : ''

const api = {
  loadMachines: (cb, params) => {
    const { auth } = store.getState()
    return Server.post(`/list_vendings_machines${indx}`, params, {...auth})
      .then(response=>{
        if(response.data && response.data.result === "ok"){ cb(response.data.data) }
      });
  },
  openMachine: (cb, params) => {
    const { auth } = store.getState()
    return Server.post(`/result_ok${indx}`, params, {...auth})
      .then(response=>{
        if(response.data && response.data.result === 'ok') cb(params)
      })
  },
  closeMachine: (cb, params) => {
    const { auth } = store.getState()
    return Server.post(`/result_ok${indx}`, params, {...auth})
      .then(response=>{
        if(response.data && response.data.result === 'ok') cb(params)
      })
  },
  isOpenedMachine: (cb, params) => {
    const { auth } = store.getState()
    return Server.post(`/lock_is_open${indx}`, params, {...auth})
      .then(response=>{
        if(response.data && response.data.result === 'ok') cb(response.data.data)
      })
  }
}

export {
  api as default
}