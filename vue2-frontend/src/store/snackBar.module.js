
export const snackBar = {
    namespaced: true,
    state: {
        snackbar: {
          visible: false,
          text: null,
          timeout: 6000,
          multiline: false,
        }
      },
      getters: {
        getSnackBar: state => {
            return state.snackbar
        },
      },
      actions: {
        showSnackbar({ commit }, payload) {
            commit('SHOW_SNACKBAR', payload)
        },
        closeSnackbar({ commit }) {
            commit('CLOSE_SNACKBAR')
        }
      },
      mutations: {
        SHOW_SNACKBAR(state, payload) {
          state.snackbar.text = payload.text
          state.snackbar.multiline = (payload.text.length > 50) ? true : false
          
          if (payload.multiline) {
            state.snackbar.multiline = payload.multiline
          }
          
          if (payload.timeout) {
            state.snackbar.timeout = payload.timeout
          }
    
          state.snackbar.visible = true
        },
        CLOSE_SNACKBAR(state) {
          state.snackbar.visible = false
          state.snackbar.multiline = false
          state.snackbar.timeout = 6000
          state.snackbar.text = null
        },
      }
}