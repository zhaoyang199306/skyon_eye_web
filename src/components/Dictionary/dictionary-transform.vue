<template>
  <div>{{result}}</div>
</template>
<script>
import store from './dictionaryStore'
export default {
  name: 'dictionary-transform',
  props: ['code', 'value'],
  data() {
    return {
      result: ''
    }
  },
  methods: {
    getNameByCodeAndValue(code, value) {
      let self = this
      store.getNameByCodeAndValue(code, value).then(data => {
        self.result = data
      })
    }
  },
  watch: {
    code(newVal, oldVal) {
      this.getNameByCodeAndValue(newVal, this.value)
    },
    value(newVal, oldVal) {
      this.getNameByCodeAndValue(this.code, newVal)
    }
  },
  mounted() {
    this.getNameByCodeAndValue(this.code, this.value)
  }
}
</script>

