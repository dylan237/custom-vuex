export const forEachValue = (obj, callback) => {
  Object.keys(obj).forEach(key => callback(obj[key], key))
}

// forEachValue({ a: 1 }, (value, key) => {
//   console.log(value) // 1
//   console.log(key) // a
// })
