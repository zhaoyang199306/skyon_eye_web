<template>
  <el-select
   v-model="selected"
   @change="inputChange"
   :size="size"
   :loading="loading"
   :placeholder="placeholder"
   :filterable="filterable"
   :clearable="clearable"
   :disabled="disabled"
   :multiple="multiple"
   class="dictionary-select"
   style="width:220px;"
  >
    <el-option v-for="(option, index) in options" :value="option.dictValue" :key="index" :label="option.dictLabel">
    </el-option>
  </el-select>
</template>
<script>
import store from './dictionaryStore'
export default {
  name: 'dictionary-select',
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    // 使用时，也得设置 value 才行
    label: {
      type: [String, Number, Array],
      default: ''
    },
    code: {
      type: String,
      validator(value) {
        return value !== ''
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    filterable: {
      type: Boolean,
      default: false
    },
    size: {
      validator(value) {
        return ['medium', 'small', 'mini'].indexOf(value) >= 0
      }
    },
    placement: {
      validator(value) {
        return ['top', 'bottom'].indexOf(value) >= 0
      },
      default: 'bottom'
    }
  },
  data() {
    return {
      loading: false,
      options: [],
      selected: ''
    }
  },
  methods: {
    inputChange(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },
  watch: {
    value(val) {
      this.selected = val === null ? val : val + ''
    },
    selected(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },
  mounted() {
    this.selected = this.value
    store.getDictsByDictCode(this.code).then(data => {
      this.options = data
    })
  }
}
</script>

