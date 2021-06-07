import axios from 'axios'
import { apiAuthUrl } from './config'
import { store } from '../reducers'

const Server = axios.create({
  baseURL: apiAuthUrl,
  responseType: 'json',
  // mode: 'cors',
  withCredentials: true,
  // credentials: 'same-origin',
  // crossdomain: true,
});

const api = {
  logIn: (data, cb, fcb) => {
    const { auth } = store.getState()
    return Server.post('/user_auth.php', data, {headers: auth.headers })
      .then(response=>{
        const resp = response.data.result === 'ok' ? response.data : undefined;
        if(resp){
          if(resp.time || resp.agree){
            cb(resp);
          }else if(resp.user){
            cb(resp.user);
          }
        }else if(response.data.result === 'error'){
          if(response.data.error === 'Authorization error, check entered data'){
            fcb(true);
          }
        }
      })
      .catch(err=>{
        
      });
  }
}

export {
  api as default
}