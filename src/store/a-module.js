import c from './c-module'

export default {
  namespaced: true,
  state: {
    age: 10
  },
  getters: {
    getAge (state) {
      return state.age
    }
  },
  mutations: {
    increase (state, payload) {
      state.age += payload
    },
    minus (state, payload) {
      state.age -= payload
    }
  },
  actions: {
    asyncIncrease ({ commit, dispatch }, payload) {
      setTimeout(() => {
        commit('increase', payload)
      }, 1000)
    }
  },
  modules: {
    c
  }
}
