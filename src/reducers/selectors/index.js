const selectors = {
    getUser: state => {
      return {
            user: state.user
      }
    },
    getAuthState: state => {
        return {
            auth: state.auth,
            user: state.user
        }
    },
    getMenu: state => {
        if(state.app.action === 'add') return state.menu.add
        if(state.app.action === 'remove') return state.menu.remove
        return null
    },
    getStateAppInitialize: state => {
        return state.app.initialized
    },
    getPopupInfo: state => {
        return state.popup
    },
    getPopupState: state => {
        return state.popup.show
    },
    getActiveMachine: state => {
        return state.app.activeMachine
    },
    getMachinesList: state => {
        return state.app.machines
    },
    getUserGeo: state => {
        const { user } = state
        return {longtitude: user.longtitude, latitude: user.latitude}
    }
  }

  export { selectors as default }