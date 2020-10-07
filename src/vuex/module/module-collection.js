import { forEachValue } from '@/utils'

class ModuleCollection {
  constructor (options) {
    this.register([], options) // dfs 遍歷 -> [root,a, c] 陣列前一個成員即為該成員的父模組
  }

  register (path, rootModule) {
    const newModule = {
      _raw: rootModule,
      _children: {},
      state: rootModule.state
    }

    if (path.length === 0) {
      // root
      this.root = newModule
    } else {
      const parent = path.slice(0, -1).reduce((memo, curr) => {
        return memo._children[curr]
      }, this.root)
      parent._children[path[path.length - 1]] = newModule
    }

    if (rootModule.modules) {
      forEachValue(rootModule.modules, (module, moduleName) => {
        this.register([...path, ...moduleName], module)
      })
    }
  }
}

export default ModuleCollection

/* 透過 ModuleCollection 將 store 格式化成以下樣子
this.root = {
  _raw: 'root module',
  state: 'root state',
  _children: {
    A: {
      _raw: 'A module',
      state: 'A state',
      _children: {
        C: {
          _raw: 'C module',
          state: 'C state'
        }
      }
    },
    B: {
      _raw: 'B module',
      state: 'B state'
    }
  }
}
*/
