import * as types from './types'
import selectors from '../selectors'

const initialState = {
    aU: localStorage.getItem('aU'),
    aP: localStorage.getItem('aP'),
    headers: { 'Authorization': `Basic ${btoa( localStorage.getItem('aU') + ':' + localStorage.getItem('aP') )}` }
  }
  
const reducer = (state = initialState, action)=>{
    let newState;
    switch (action.type) {
        case types.CLEAR_AUTH_DATA:
            localStorage.removeItem('aU')
            localStorage.removeItem('aP')
            newState = {aU: null, aP: null, headers: null};
            break;
        default: // действие по умолчанию – возврат текущего состояния
            newState = state;
  }
  return newState;
}

function mapStateToProps(state){
    return selectors.getAuthState(state)
}

export {
    reducer as default,
    mapStateToProps as authUserMapStateToProps
}