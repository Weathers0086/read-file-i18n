/**
 * 扁平化输出对象，使用_隔开，将 {a: {b: 1}}，输出为 {a_b: 1}
 * */
function flatOutput(data, key) {
  if (!data) return data
  if (Object.prototype.toString.call(data) === '[object Object]') {
    Object.keys(data).forEach(key2 => { // 合并key
      if (Object.prototype.toString.call(data[key2]) === '[object Object]') {
        data = Object.assign({}, data, flatOutput(data[key2], key2))
      }
    })
    const result = {}
    Object.keys(data).forEach(key3 => {
      if (typeof data[key3] === 'string') {
        // console.log(key, key3)
        result[(key ? (key + '.') : '') + key3] = data[key3]
        // result[(key ? (key + '.') : '') + key3] = data[key3]
      }
    })
    data = result
  }
  return data
}

function flatOutputList(data) { // 输入对象，输出数组
  const obj = flatOutput(data)
  const arr = []
  Object.keys(obj).forEach(key => {
    arr.push(key)
  })
  return arr
}

module.exports =  {
  flatOutput,
  flatOutputList
}
