/**
 * 读取文件，写入文件，查找没有用到的i18n
 * */
const fs = require('fs')
const path = require('path')
const { flatOutputList } = require('./utils')
const en = require('../new_kupu_pc/src/lang/en.js')
const name = new Date().getTime()
const savePathI18n = './output/用到i18n的位置-' + name + '.txt'
const savePathWord = './output/未使用的key-' + name + '.txt'

const sourcePath = '..\\..\\new_kupu_pc\\src'
const ignoreList = [ // 忽略的文件
  // sourcePath + '\\api',
  sourcePath + '\\assets',
  sourcePath + '\\directive',
  sourcePath + '\\encode',
  sourcePath + '\\filters',
  sourcePath + '\\lang',
  sourcePath + '\\styles',
  sourcePath + '\\vendor'
]

const readFileI18n = location => { // 读取文件
  fs.readFile(location, (err, data) => {
    if(err) {
      console.log('111', err)
    } else {
      const html = data.toString()
      const i18nArr = html.match(/\([^)]{1,200}\)/ig)
      if (i18nArr) {
        const i18nStr = i18nArr.join('')
        // console.log(`file: ${location}`, 667, i18nStr)
        fs.appendFile(savePathI18n, i18nStr, err => { // 写入文件
          if (err) {
            console.log('222', err)
          }
        })
      }
    }
  })
}

const readFileWord = (key, location) => { // 读取文件
  fs.readFile(location, (err, data) => {
    if(err) {
      console.log('333', err)
    } else {
      const html = data.toString()
      // console.log('文件读取成功：', html)
      if (html.indexOf(key) === -1) {
        console.log('444没有使用的key：', key)
        fs.appendFile(savePathWord, key + '\n', err => { // 写入文件
          if (err) {
            console.log('555', err)
          }
        })
      }
    }
  })
}

const queryI18nKey = en => { // 遍历i18n的key
  const enList = flatOutputList(en)
  enList.forEach(key => {
    readFileWord(key, savePathI18n)
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
      readFileI18n(location)
    }
  })
}

readDir(sourcePath)
setTimeout(() => {
  queryI18nKey(en)
}, 30000)
