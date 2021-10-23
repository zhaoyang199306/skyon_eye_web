<template>
  <div>
  </div>
</template>

<script>

  export default {
    name: "SessionLogin",
    watch: {},
    created() {
      let callback = this.$route.query.callback;

      this.redirect = this.$route.query.redirect;

      this.$store.dispatch("SessionLogin", callback).then(() => {
        this.$router.push({
          path: this.redirect || "/"
        });
      }).catch(() => {
      })
    },
    methods: {}
  };
</script>

<style rel="stylesheet/scss" lang="scss">
</style>



