import {getDicts} from '@/api/system/dict/data.js'

/**
 * 缓存请求结果
 */
let DictionaryMap = {}

export default {
  // 根据dictCode获取全部字典项
  getDictsByDictCode(dictCode) {
    if (!dictCode) {
      return Promise.resolve([])
    }
    if (DictionaryMap[dictCode] && DictionaryMap[dictCode].data) {
      return Promise.resolve(DictionaryMap[dictCode].data)
    }
    if (DictionaryMap[dictCode] && DictionaryMap[dictCode].loading) {
      return DictionaryMap[dictCode].promise
    }
    DictionaryMap[dictCode] = {}
    DictionaryMap[dictCode].loading = true
    DictionaryMap[dictCode].promise = DictService.getDicts(dictCode).then(res => {
      DictionaryMap[dictCode].data = res.data
      return res.data
    })
    return DictionaryMap[dictCode].promise
  },
  // 根据字典项和value得出结果
  getNameByCodeAndValue(dictCode, value) {
    return this.getDictsByDictCode(dictCode).then(items => {
      let results = value
      items.forEach(data => {
        // eslint-disable-next-line
        if (data.dictCode === value) {
          results = data.dictLabel
        }
      })
      return results
    })
  }
}
