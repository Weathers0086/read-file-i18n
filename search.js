/**
 * 查找没有用到的i18n
 * */
const fs = require('fs')
const { flatOutputList } = require('./utils')
const en = require('../../yn_job_operation/src/lang/en.js')

const saveI18nPath = './1628746372228.txt'

const readFile = (key, location) => { // 读取文件
  fs.readFile(location, (err, data) => {
    if(err) {
      console.log('err', err)
    } else {
      const html = data.toString()
      // console.log('文件读取成功：', html)
      if (html.indexOf(key) === -1) {
        console.log('没有使用的key：', key)
      }
    }
  })
}

const queryI18nKey = en => { // 遍历i18n的key
  const enList = flatOutputList(en)
  enList.forEach(key => {
    readFile(key, saveI18nPath)
  })
}

queryI18nKey(en)
