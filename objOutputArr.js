/**
 * 输入多层级对象，输出为一层对象
 * */
const nameSource = 'en'
const outputName = 'new_kupu_pc_' + nameSource
const fs = require('fs')
const { flatOutput } = require('./utils')
const lang = require('../new_kupu_pc/src/lang/' + nameSource + '.js')
const savePath = './output/' + outputName + '.js'

const saveFile = (data, savePath) => {
  const html = 'export default ' + JSON.stringify(data, null, 2)
  fs.writeFile(savePath, html, err => { // 写入文件
    if (err) {
      console.log(err, 777)
    }
  })
}

const queryI18nKey = lang => { // 遍历i18n的key
  const obj = flatOutput(lang)
  saveFile(obj, savePath)
}

queryI18nKey(lang)
