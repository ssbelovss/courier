import * as types from './types';
import selectors from '../selectors'

import { 
  reducer_addToMachine as addToMachine,
  reducer_addToMachineSuccess as addToMachineSuccess
} from './actions'

const initialState = {
    add: null,
    remove: null
  }
  
const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
      case types.LOAD_MEALS_TO_ADD:
        newState = Object.assign({}, state, {add: action.payload.map(el=>{el.inProgress=false;return el;})});
        break;
      case types.LOAD_MEALS_TO_REMOVE:
        newState = Object.assign({}, state, {remove: action.payload.map(el=>{el.inProgress=false;return el;})});
        break;
      case types.ADD_TO_MACHINE:
        newState = Object.assign({}, state, {add: addToMachine({menu: state.add, id: action.payload})});
        break;
      case types.ADD_TO_MACHINE_SUCCESS:
        newState = Object.assign({}, state, {add: addToMachineSuccess({menu: state.add, id: action.payload})});
        break;
      case types.REMOVE_FROM_MACHINE:
        newState = Object.assign({}, state, {remove: addToMachine({menu: state.remove, id: action.payload})});
        break;
      case types.REMOVE_FROM_MACHINE_SUCCESS:
        newState = Object.assign({}, state, {remove: addToMachineSuccess({menu: state.remove, id: action.payload})});
        break;
      default:
        newState = state;
    }
  return newState;
  }

function mapStateToProps(state){
    return {
        list: selectors.getMenu(state),
        activeMachine: selectors.getActiveMachine(state),
        action: state.app.action
    };
}

export {
  reducer as default,
  mapStateToProps as menuMapStateToProps
}