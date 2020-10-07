import { forEachValue } from '@/utils'
class Store {
  constructor (options) {
    // console.log('options: ', options)
    const {
      state = {},
      getters = {},
      mutations = {},
      actions = {}
    } = options
    const computed = {}

    this.getters = {}
    forEachValue(getters, (fn, key) => {
      computed[key] = () => {
        return fn(this.state)
      }
      Object.defineProperty(this.getters, key, {
        get: () => {
          return this._vm[key]
        },
        // value: getters[getterName](this.state),
        // writable: false,
        enumerable: false,
        configurable: false
      })
    })
    this._vm = new Vue({
      data: {
        // $開頭的資料 Vue 預設不會掛到 _vm 上，但可以在 vm._data 內找到
        $$state: state
      },
      computed
    })
    this.mutations = {}
    this.actions = {}
    forEachValue(mutations, (fn, key) => {
      this.mutations[key] = (payload) => fn(this.state, payload)
    })
    forEachValue(actions, (fn, key) => {
      this.actions[key] = (payload) => fn(this, payload)
    })
  }

  // 使用箭頭函式是為了 this 可以指向 store 實例
  commit = (type, payload) => {
    this.mutations[type](payload)
  }

  dispatch = (type, payload) => {
    this.actions[type](payload)
  }

  get state () {
    return this._vm._data.$$state
  }
}

let Vue
// 入口點引入此檔案，並使用 Vue.use(Vuex)，即會觸發此 install 函數
const install = (_Vue) => {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      // console.log('this.$option---', this.$options)
      if (this.$options && this.$options.store) {
        // root (App component)
        this.$store = this.$options.store
      } else {
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}

export default { install, Store }
