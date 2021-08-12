/**
 * 读取文件，写入文件
 * */
const fs = require('fs')
const path = require('path')

const sourcePath = '..\\..\\yn_job_operation\\src'
const ignoreList = [ // 忽略的文件
  sourcePath + '\\api',
  sourcePath + '\\assets',
  sourcePath + '\\directive',
  sourcePath + '\\encode',
  sourcePath + '\\filters',
  sourcePath + '\\lang',
  sourcePath + '\\styles',
  sourcePath + '\\vendor'
]
const saveI18nPath = './' + new Date().getTime() + '.txt'

const readFile = location => { // 读取文件
  fs.readFile(location, (err, data) => {
    if(err) {
      console.log('err', err)
    } else {
      const html = data.toString()
      const i18nArr = html.match(/\([^)]{1,100}\)/ig)
      if (i18nArr) {
        const i18nStr = i18nArr.join('')
        // console.log(`file: ${location}`, 667, i18nStr)
        fs.appendFile(saveI18nPath, i18nStr, err => { // 写入文件
          if (err) {
            console.log(err, 555)
          }
        })
      }
    }
  })
}

const readDir = (entry) => { // 遍历文件夹中的文件
  const dirInfo = fs.readdirSync(entry)
  dirInfo.forEach(item => {
    const location = path.join(entry, item)
    const info = fs.statSync(location)
    if (info.isDirectory()) {
      if (ignoreList.indexOf(location) === -1) {
        readDir(location)
      } else {
        // console.log(`dir: ${location}`)
      }
    } else {
      // console.log(`file: ${location}`)
      readFile(location)
    }
  })
}

readDir(sourcePath)
