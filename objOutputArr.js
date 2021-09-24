/**
 * 输入多层级对象，输出为数组
 * */
const fs = require('fs')
const { flatOutput } = require('./utils')
const en = require('../../new_kupu_pc/src/lang/en.js')
const id = require('../../new_kupu_pc/src/lang/id.js')
const savePathEn = './output/new_kupu_pc_en.js'
const savePathId = './output/new_kupu_pc_id.js'

const saveFile = (data, savePath) => {
  const html = 'export default ' + JSON.stringify(data)
  fs.appendFile(savePath, html, err => { // 写入文件
    if (err) {
      console.log(err, 777)
    }
  })
}

const queryI18nKey = en => { // 遍历i18n的key
  const objEn = flatOutput(en)
  const objId = flatOutput(id)
  saveFile(objEn, savePathEn)
  saveFile(objId, savePathId)
}

queryI18nKey(en)
