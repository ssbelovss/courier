import * as types from './types'
import selectors from '../selectors'

import { reducer_closeLockMachine as closeMachine, reducer_openLockMachine as openMachine } from './actions'

const initialState = {
    initialized: false,
    machines: null,
    activeMachine: null,
    action: null,
    version: undefined,
    isActualVersion: undefined
  }
  
const reducer = (state = initialState, action)=>{
    let newState;
    const { machines, activeMachine } = state
    switch (action.type) {
        case types.INITIALIZED_SUCCESS:
            newState = { ...state, initialized: true };
            break;
        case types.INITIALIZED_FAIL:
            newState = { ...state, initialized: null };
            break;
        case types.LOAD_MACHINES_LIST:
            newState = { ...state, machines: action.payload };
            break;
        case types.SET_ACTIVE_MACHINE:
            newState = { ...state, activeMachine: action.payload };
            break;
        case types.UNSET_ACTIVE_MACHINE:
            newState = { ...state, activeMachine: null };
            break;
        case types.OPEN_ACTIVE_MACHINE:
            newState = { ...state, ...openMachine({machines: machines, active: activeMachine}) };
            break;
        case types.CLOSE_ACTIVE_MACHINE:
            newState = { ...state, ...closeMachine({machines: machines, active: activeMachine}) };
            break;
        case types.SET_ADD_MEALS:
            newState = { ...state, action: 'add' };
            break;
        case types.SET_REMOVE_MEALS:
            newState = { ...state, action: 'remove' };
            break;
        case types.UNSET_ACTION_MEALS:
            newState = { ...state, action: null };
            break;
        default:
            newState = state;
  }
  return newState;
}

function mapStateToProps(state){
    return {
        initialized: selectors.getStateAppInitialize(state),
        popup: selectors.getPopupState(state)
    };
}

function mapActiveMachineStateToProps(state){
    return {
        activeMachine: selectors.getActiveMachine(state)
    };
}

function machineStateToProps(state){
    return {
        machines: selectors.getMachinesList(state),
        ...selectors.getUserGeo(state),
        activeMachine: selectors.getActiveMachine(state)
    };
}

export {
    reducer as default,
    mapStateToProps as appMapStateToProps,
    mapActiveMachineStateToProps,
    machineStateToProps
}