export const state = () => ({
  status: false,
  message: ''
})

export const getters = {
  status: (state) => {
    return state.status
  },
  message: (state) => {
    return state.message
  }
}

export const mutations = {
  setEnable (state) {
    state.status = true
  },
  setDisable (state) {
    state.status = false
  },
  setMessage (state, message) {
    state.message = message
  }
}

export const actions = {
  snackOn ({ commit }) {
    commit('setEnable')
  },
  snackOff ({ commit }) {
    commit('setDisable')
  },
  setMessage ({ commit }, message) {
    commit('setMessage', message)
  }
}
