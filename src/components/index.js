import DictionaryTransform from './Dictionary/dictionary-transform'
import DictionarySelect from './Dictionary/dictionary-select'
import Pagination from './Pagination'

const components = [
  DictionaryTransform, DictionarySelect, Pagination
]

const install = (Vue) => {
  if (install.installed) return
  components.map(component => {
    Vue.component(component.name, component)
  })
}

export default install
