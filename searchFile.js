/**
 * 查找文件
 * */
const fs = require('fs')
const text = './data.txt'
const sourceFiles = '../../ccc'

const searchFile = (fileName) => { // 查看文件夹中是否含有该文件
  const nowDirInfo = fs.readdirSync(sourceFiles)
  const index = nowDirInfo.findIndex(item => item === fileName)
  return index > -1
}

const readFile = location => { // 读取文件
  fs.readFile(location, (err, data) => {
    if(err) {
      console.log('111', err)
    } else {
      let str = data.toString()
      str = str.replace(/--/ig, '')
      str = str.replace(/\|/ig, '')
      str = str.replace(/\+/ig, '')
      str = str.replace(/\s/ig, '')
      let arr = str.split('https://pic.kupu.id/html/')
      // console.log(arr)
      let count = 0
      arr.forEach(fileName => {
        if (fileName) {
          if(!searchFile(fileName)) {
            console.log(fileName)
            count++
          }
        }
      })
      console.log(count)
    }
  })
}

readFile(text)
