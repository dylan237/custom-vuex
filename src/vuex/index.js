let Vue
// 入口點引入此檔案，並使用 Vue.use(Vuex)，即會觸發此 install 函數
const install = (_Vue) => {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      console.log('this.$option---', this.$options.name)
      if (this.$options && this.$options.store) {
        // root
        this.$store = this.$options.store
      } else {
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}

class Store {
  constructor (options) {
    this.vm = new Vue({
      data: {
        state: options.state
      }
    })
    let getters = options.getters || {}
    this.getters = {}
  }
}

export default { install, Store }
