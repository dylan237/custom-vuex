import Vue from 'vue'
import Vuex from 'vuex'
// import Vuex from '../vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    age: 10
  },
  getters: {
    getAge (state) {
      // console.log('getAge---')
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
  modules: {}
})
