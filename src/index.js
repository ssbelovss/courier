import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './app'
import { store } from './reducers'

import { qrScanResult, appActivate } from './reducers/app/actions'
import { setUserGeo } from './reducers/user/actions'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

window.qrScanResult = qrScanResult;
window.setUserGeo = setUserGeo;
window.appActivate = appActivate;

// setTimeout(userGeo, 500, {longtitude: 56, latitude: 44})
// changes for git
// Add changes for secondBranch
// Second changes for branch 'secondBranch'