import * as types from './types'
import api from '../../api/menu'

function loadMealsToAdd(meals){
  return {
    type: types.LOAD_MEALS_TO_ADD,
    payload: meals
  }
}

function loadMealsToRemove(meals){
  return {
    type: types.LOAD_MEALS_TO_REMOVE,
    payload: meals
  }
}

function addToMachine(id){
  return {
    type: types.ADD_TO_MACHINE,
    payload: id
  }
}

function removeFromMachine(id){
  return {
    type: types.REMOVE_FROM_MACHINE,
    payload: id
  }
}

function reducer_addToMachine({menu, id}){
  const list = menu.map(el=>{
    if(+el.id!==+id) return el
    el.inProgress = true
    return el
  })
  return list
}

function addToMachineSuccess(id){
  return {
    type: types.ADD_TO_MACHINE_SUCCESS,
    payload: id
  }
}

function removeFromMachineSuccess(id){
  return {
    type: types.REMOVE_FROM_MACHINE_SUCCESS,
    payload: id
  }
}

function reducer_addToMachineSuccess({menu, id}){
  const _list = menu.map(el=>{
    if(+el.id!==+id) return el
    el.inProgress = false
    el.count = +el.count - 1
    if(el.count){return el}else{return null}
  })
  const list = _list.filter(el=>el!==null)
  return list
}

const thunkAddToMachine = (params) => (dispatch, getState) => {
  dispatch(addToMachine(params.id))
  return api.addToMachine(()=>dispatch(addToMachineSuccess(params.id)), params)
}

const thunkRemoveFromMachine = (params) => (dispatch, getState) => {
  dispatch(removeFromMachine(params.id))
  return api.removeFromMachine(()=>dispatch(removeFromMachineSuccess(params.id)), params)
}

const thunkLoadMeals = () => (dispatch, getState) => {
  const { app } = getState()
  const { action } = app
  const params = {id: app.activeMachine}
  let _api
  if(action === 'add') _api = api.getAddMenu(meals => {
    dispatch(loadMealsToAdd(meals));
  }, params)
  if(action === 'remove') _api = api.getRemoveMenu(meals => {
    dispatch(loadMealsToRemove(meals));
  }, params)
  if(!_api) return null
  return _api
}

export {
  thunkLoadMeals as loadMeals,
  reducer_addToMachine,
  reducer_addToMachineSuccess,
  thunkAddToMachine,
  thunkRemoveFromMachine
}