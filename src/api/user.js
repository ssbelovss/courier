import axios from 'axios'
import { apiUserUrl } from './config'
import { store } from '../reducers'

const { auth } = store.getState()

const Server = axios.create({
  baseURL: apiUserUrl,
  responseType: 'json',
  // mode: 'cors',
  headers: { ...auth.headers },
  withCredentials: true,
  // credentials: 'same-origin',
  // crossdomain: true,
});

const api = {
  loadUser: cb => {
    return Server.post('/user_json.php', {})
        .then(response=>{
            if(response.data && response.data.result === "ok"){ cb(response.data.user) }
        })
        .catch(err=>{

        });
  },
  logIn: (cb, params) => {
    return Server.post('/user_auth.php', params)
        .then(response=>{
        if(response.data && response.data.result === "ok"){ cb(response.data.user) }
        })
        .catch(err=>{

        });
  },
  logOut: (cb) => {
    return Server.post('/user_logout.php', {})
        .then(response=>{
        if(response.data && response.data.result === "ok"){ cb() }
        })
        .catch(err=>{

        });
  },
  setUser: (cb, params) => {
    return Server.post('/user_set_json.php', params)
        .then(response=>{
          if(response.data && response.data.result === "ok") cb();
        })
        .catch(err=>{

        });
  },
  loadUsedCustomers: cb => {
    return Server.post('/list_use_customers_json.php', {})
        .then(response=>{
            if(response.data && response.data.result === "ok"){ cb(response.data.data) }
        })
        .catch(err=>{

        });
  },
  loadChecks: (cb, p) => {
    const url = (p.type === '2') ? '/list_tickets_json.php' : '/list_orders_json.php';
    return Server.post(url, p)
        .then(response=>{
          if(response.data && response.data.result === "ok") cb({list: response.data.data, type: p.type, id: p.id, route: p.route});
        })
        .catch(err=>{

        });
  },
  loadShare: (cb, p) => {
    const url = '/list_share_json.php';
    return Server.post(url, p)
        .then(response=>{
          if(response.data && response.data.result === "ok") cb({list: response.data.data});
        })
        .catch(err=>{

        });
  },
  setShareLike: (fcb, p) => {
    const url = '/resultOK.php';
    return Server.post(url, p)
        .then(response=>{
          if(response.data && response.data.result !== "ok") fcb(p);
        })
        .catch(err=>{
          fcb(p);
        });
  },
  removeShareLike: (fcb, p) => {
    const url = '/resultOK.php';
    return Server.post(url, p)
        .then(response=>{
          if(response.data && response.data.result !== "ok") fcb(p);
        })
        .catch(err=>{
          fcb(p);
        });
  },
  loadBindingList: (cb) => {
    const url = '/get_bindings_json.php';
    return Server.post(url)
        .then(response=>{
          const { data } = response
          if(data && data.result === "ok"){
            if(data.bindings && data.bindings.bindings && data.bindings.bindings.length){
              cb(data.bindings.bindings)
            }
          }else{
            cb(null)
          }
        })
        .catch(err=>{
          
        });
  }
}

export {
  api as default
}