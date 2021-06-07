import axios from 'axios'
import { apiConfigAppUrl } from './config'

const api = {
  setApplicationScanQR: (cb) => {
    const url = 'scanQR';
    return axios.get(`${apiConfigAppUrl}${url}`)
      .then(res => {
        // cb();
      })
      .catch(err=>{
        // cb();
    });
  }
}


export { 
  api as default
 }