import * as types from './types';
import {  } from './actions'
import selectors from '../selectors'

const initialState = {
    show: false,
    title: null,
    content: null,
    canClose: true
}
  
const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case types.SHOW_POPUP:
        newState = {...state, show: true, ...action.payload};
        break;
    case types.HIDE_POPUP:
        newState = {...state, ...initialState};
        break;
    default:
        newState = state;
    }
  return newState;
}

function mapStateToProps(state){
    return selectors.getPopupInfo(state)
}

export {
    reducer as default,
    mapStateToProps as popupMapStateToProps
}