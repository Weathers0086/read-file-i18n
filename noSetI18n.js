/**
 * 读取文件，写入文件，查找没有定义i18n的字段
 * */
const fs = require('fs')
const path = require('path')
const name = new Date().getTime()
const savePathI18n = './output/待翻译的字段-' + name + '.txt'

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

const filter1 = [ // 必定不存在的字符
  '_',
  '/',
  '\\',
  '<!--',
  '{{',
  '@',
  'qy-',
  '=>',
  '==',
  'i18n.global',
  'const ',
  'this.',
  '00:00:00',
  '.slice',
  '({',
  ']}',
  '$t',
  'date.get',
  '.setAttribute',
  '.innerHTML =',
  ' > 9 ',
  'loadScript',
  '.length',
  '(item,'
]
const filter2 = [ // 可能不存在的字符
  'method: ',
  'name: ',
  'children: ',
  'path: ',
  'icon: '
]
const filter3 = [ // 可能存在的字符
  // ' '
]

const readFileI18n = location => { // 读取文件
  fs.readFile(location, (err, data) => {
    if(err) {
      console.log('111', err)
    } else {
      const html = data.toString()
      const i18nArr = html.match(/\'[^']{2,200}\'/ig) // 单引号
      // const i18nArr = html.match(/\"[^"]{2,200}\"/ig) // 双引号
      if (i18nArr) { // && location.slice(-2) === 'js'
        const i18nArr2 = i18nArr.filter(item => { // 过滤不存在的字符
          if (item.length < 2) return false
          const hasWord = filter1.some(function(val) {
            return item.indexOf(val) !== -1
          })
          // console.log('item.slice(-1)', item.slice(-1), '222')
          return !hasWord && (item.slice(-2) !== '="')
        })
        const i18nArr3 = i18nArr2.filter(item => { // 过滤可能不存在的字符
          const hasWord = filter2.some(function(val) {
            return item.indexOf(val) !== -1
          })
          return !hasWord
        })
        const i18nArr4 = i18nArr3.filter(item => { // 过滤可能存在的字符
          const hasWord = filter3.some(function(val) {
            return item.indexOf(val) === -1
          })
          return !hasWord
        })

        const i18nStr = i18nArr4.join('')
        if (i18nStr.length > 2) {
          console.log('\n')
          console.log(location, 112233, '------------: ')
          console.log(i18nStr)
          console.log('\n')
          fs.appendFile(savePathI18n, i18nStr + '\n\n', err => { // 写入文件
            if (err) {
              console.log('222', err)
            }
          })
        }
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
      readFileI18n(location)
    }
  })
}

readDir(sourcePath)
