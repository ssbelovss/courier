import axios from 'axios'
import { apiMenuUrl } from './config'
import { store } from '../reducers'

const Server = axios.create({
  baseURL: apiMenuUrl,
  responseType: 'json',
  withCredentials: true
});

const indx = (process && process.env && process.env.NODE_ENV === 'development') ? '/index.php' : ''

const api = {
  getAddMenu: (cb, params) => {
    const { auth } = store.getState()
    return Server.post(`/list_add_items${indx}`, params, {...auth})
      .then(response=>{
        if(response.data && response.data.result === "ok"){ cb(response.data.data) }
      })
      .catch(err=>{

      });
  },
  getRemoveMenu: (cb, params) => {
    const { auth } = store.getState()
    return Server.post(`/list_remove_items${indx}`, params, {...auth})
      .then(response=>{
        if(response.data && response.data.result === "ok"){ cb(response.data.data) }
      })
      .catch(err=>{

      });
  },
  addToMachine: (cb, params) => {
    const { auth } = store.getState()
    return Server.post(`/result_ok${indx}`, params, {...auth})
      .then(response=>{
        if(response.data && response.data.result === "ok"){ cb() }
      })
      .catch(err=>{

      });
  },
  removeFromMachine: (cb, params) => {
    const { auth } = store.getState()
    return Server.post(`/result_ok${indx}`, params, {...auth})
      .then(response=>{
        if(response.data && response.data.result === "ok"){ cb() }
      })
      .catch(err=>{

      });
  }
}

export {
  api as default
}