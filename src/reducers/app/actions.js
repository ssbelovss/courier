import * as types from './types'
import { store } from '../index'

import apiMachine from '../../api/machines'
import apiApp from '../../api/app'
import {
    thunkAddToMachine as addToMachine,
    thunkRemoveFromMachine as removeFromMachine
} from '../menu/actions'
import { showPopup } from '../popup/actions'

function initializedSuccess() {
    return {
      type: types.INITIALIZED_SUCCESS
    }
}

function initializedFail() {
    return {
      type: types.INITIALIZED_FAIL
    }
}

function loadMachines(list) {
    return {
      type: types.LOAD_MACHINES_LIST,
      payload: list
    }
}

function setActiveMachine(id) {
    return {
      type: types.SET_ACTIVE_MACHINE,
      payload: id
    }
}

function unsetActiveMachine() {
    store.dispatch(thunkCloseLockMachine())
    return {
      type: types.UNSET_ACTIVE_MACHINE
    }
}

function appActivate(){
    store.dispatch(unsetActiveMachine())
}

function qrScanResult(result, code){
    if(result){
        store.dispatch(analizeQRcodeResult(result, code))
    }else{
        // popup
        store.dispatch(showPopup({content: 'Ошибка чтения QR устройством'}))
        console.log('Ошибка чтения QR устройством')
    }
    
}

const analizeQRcodeResult = (result, code) => (dispatch, getState) => {
    const decode = wtf(code)
    console.log('decode QR string', decode)
    const { menu, app } = getState()
    switch (decode.type){
        case 'machine':
            const { machines } = app
            if(machines && machines.filter(item=>+decode.id===+item.id).length){
                dispatch(setActiveMachine(decode.id))
            }else{
                // popup
                store.dispatch(showPopup({content: 'Данного магазина нет в списке'}))
                console.log('Данного магазина нет в списке')
            }
            break;
        case 'menu':
            const { add, remove } = menu
            const { action } = app
            if(!action){
                store.dispatch(showPopup({content: 'Не выбрано действие: изъятие или перемещение'}))
                console.log('Не выбрано действие: изъятие или перемещение')
                return
            }
            const list = (action === 'add') ? add : remove
            if(list && list.filter(item=>+decode.id===+item.id).length){
                if(action === 'add') dispatch(addToMachine(decode))
                if(action === 'remove') dispatch(removeFromMachine(decode))
            }else{
                // popup
                store.dispatch(showPopup({content: 'Данного блюда нет в списке'}))
                console.log('Данного блюда нет в списке')
            }
            break;
        default:
            // popup
            store.dispatch(showPopup({content: 'QR-код имеет неверный формат'}))
            console.log('QR-код имеет неверный формат')
    }
}

function wtf(code){
    const result = { type:null, id:null }
    let params;
        try{
            if(typeof code == 'string') code = code.replace(/'/g,`"`);
            params = JSON.parse(code)
        }catch (e) {
            params = null
        }
        if(params && params.id){
            result.type = 'menu'
            result.id = params.id
        }else{
            const url = getURL(code)
            if(url){
                const params = new URLSearchParams(url.search)
                const customer = params.get('restoran')
                const id = params.get('table')
                result.type = 'machine'
                result.id = id
                result.customer = customer
            }
        }
    return result
}

function getURL(str){
    let regURL = /^(?:(?:https?|ftp|telnet):\/\/(?:[a-z0-9_-]{1,32}(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|tech|[a-z]{2})|(?!0)(?:(?!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:\/[a-z0-9.,_@%&?+=\~\/-]*)?(?:#[^ \'\"&<>]*)?$/i;
    if(regURL.test(str)){
        let a = document.createElement('a');
        a.href = str;
        if(a.pathname.indexOf('menu.php')===-1) return false
        if(a.search.indexOf('restoran')!==-1 && a.search.indexOf('table')!==-1) return a
        return false;
    }else{
        return false;
    }
}

const thunkInitialize = () => (dispatch, getState) => {
    dispatch(getListMachines())
        .then(()=>{
            dispatch(initializedSuccess())
            })
        .catch(err=>{
            dispatch(initializedFail())
        })
}

function openLockMachine(){
    return {
        type: types.OPEN_ACTIVE_MACHINE
    }
}

function closeLockMachine(){
    return {
        type: types.CLOSE_ACTIVE_MACHINE
    }
}

const thunkOpenLockMachine = () => (dispatch, getState) => {
    const { app } = getState()
    const params = {id: app.activeMachine}
    return apiMachine.openMachine(()=>dispatch(openLockMachine()), params)
}

const thunkCloseLockMachine = () => (dispatch, getState) => {
    const { app } = getState()
    if(app.activeMachine){
        const params = {id: app.activeMachine}
        return apiMachine.openMachine(()=>dispatch(closeLockMachine()), params)
    }
}

const thunkGetLockMachine = () => (dispatch, getState) => {
    const { app } = getState()
    const params = {id: app.activeMachine}
    return apiMachine.isOpenedMachine((data)=>{
        if(data.opened){
            dispatch(openLockMachine())
        }else{
            dispatch(closeLockMachine())
        }
    }, params)
}

function reducer_openLockMachine({machines, active}){
    if(!machines) return {machines: machines}
    const list = machines.map(el=>{
        if(+el.id!==+active) return el
        el.opened = true
        return el
    })
    return {machines: list}
}

function reducer_closeLockMachine({machines, active}){
    if(!machines) return {machines: machines}
    const list = machines.map(el=>{
        if(+el.id!==+active) return el
        el.opened = false
        return el
    })
    return {machines: list}
}

const getListMachines = () => (dispatch, getState) => {
    return apiMachine.loadMachines(data=>dispatch(loadMachines(data)))
}

const goToScan = () => () => {
    return apiApp.setApplicationScanQR(()=>{})
}

function setAddMeals(){
    return {
        type: types.SET_ADD_MEALS
    }
}

function setRemoveMeals(){
    return {
        type: types.SET_REMOVE_MEALS
    }
}

function unsetActionMeals(){
    return {
        type: types.UNSET_ACTION_MEALS
    }
}

export {
    thunkInitialize as initializeApp,
    qrScanResult,
    setActiveMachine,
    unsetActiveMachine,
    goToScan,
    thunkOpenLockMachine,
    thunkCloseLockMachine,
    thunkGetLockMachine,
    reducer_openLockMachine,
    reducer_closeLockMachine,
    getListMachines,
    appActivate,
    setAddMeals,
    setRemoveMeals,
    unsetActionMeals
}