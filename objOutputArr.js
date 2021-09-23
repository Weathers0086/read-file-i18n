/**
 * 输入多层级对象，输出为数组
 * */
const fs = require('fs')
const { flatOutput } = require('./utils')
const en = require('../../new_kupu_pc/src/lang/en.js')
const id = require('../../new_kupu_pc/src/lang/id.js')
const savePath = './output' + new Date().getTime() + '.js'

const queryI18nKey = en => { // 遍历i18n的key
  const objEn = flatOutput(en)
  const objId = flatOutput(id)
  const arr = []
  Object.keys(objEn).forEach(key => {
    arr.push({
      comment: "", // "备注"
      moduleCode: 11,
      pageName: "无",
      roleId: 102,
      tagName: key.replace('.', '_'),
      zhContent: "",
      enContent: objEn[key], // "英文",
      idlContent: objId[key] // "印尼文",
    })
  })
  const html = 'export default ' + JSON.stringify(arr)
  fs.appendFile(savePath, html, err => { // 写入文件
    if (err) {
      console.log(err, 777)
    }
  })
}

queryI18nKey(en)
