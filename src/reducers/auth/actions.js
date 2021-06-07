import * as types from './types'

function clearAuthData() {
    return {
        type: types.CLEAR_AUTH_DATA
    }
}

const thunkLogOut = params => (dispatch, getState) => {
    return null
}

export {
    clearAuthData,
    thunkLogOut
}