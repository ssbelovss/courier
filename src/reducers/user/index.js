import * as types from './types'
import selectors from '../selectors'

const initialState = {
    typeCustomer: localStorage.getItem('type_customer'),
    nameCustomer: localStorage.getItem('name_customer'),
    typeEmploy: localStorage.getItem('type_employ'),
    longtitude: localStorage.getItem('longtitude'),
    latitude: localStorage.getItem('latitude')
  }
  
const reducer = (state = initialState, action)=>{
    let newState;
    switch (action.type) {
        case types.LOG_OUT:
            localStorage.removeItem('type_customer')
            localStorage.removeItem('name_customer')
            localStorage.removeItem('type_employ')
            newState = {typeCustomer: null, nameCustomer: null, typeEmploy: null, longtitude: null, latitude: null}
            break;
        case types.SET_USER_GEO:
            const { payload } = action
            newState = Object.assign({}, state, {longtitude: payload.longtitude, latitude: payload.latitude});
            break;
        default: // действие по умолчанию – возврат текущего состояния
        newState = state;
  }
  return newState;
}

function mapStateToProps(state){
    return selectors.getUser(state)
}

export {
    reducer as default,
    mapStateToProps as userMapStateToProps
}