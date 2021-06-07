import * as types from './types'

function showPopup(params) {
    return {
      type: types.SHOW_POPUP,
      payload: params
    }
}

function hidePopup() {
    return {
      type: types.HIDE_POPUP
    }
}

window.showPopup = showPopup

export {
    showPopup,
    hidePopup
}