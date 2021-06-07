import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import app, { appMapStateToProps, mapActiveMachineStateToProps, machineStateToProps } from './app'
import auth, { authUserMapStateToProps } from './auth'
import menu, { menuMapStateToProps } from './menu'
import popup, { popupMapStateToProps } from './popup'
import user, { userMapStateToProps } from './user'

const reducer = combineReducers({
  app,
  auth,
  menu,
  popup,
  user
});
  
const middleware = [ thunk ];
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }

console.log('process:', process)
console.log('process.env:', process && process.env)

const store = createStore(reducer, applyMiddleware(...middleware));

export { 
  store,
  appMapStateToProps,
  authUserMapStateToProps,
  menuMapStateToProps,
  popupMapStateToProps,
  userMapStateToProps,
  mapActiveMachineStateToProps,
  machineStateToProps
};