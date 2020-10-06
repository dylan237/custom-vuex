class Store {
  constructor (options) {
    // console.log('options: ', options)
    const { state = {}, getters = {} } = options
    const computed = {}

    this.getters = {}
    Object.keys(getters).forEach(getterName => { 
      computed[getterName] = () => {
        return getters[getterName](this.state)
      }
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          return this._vm[getterName]
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
    // console.log('this: ', this)
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
