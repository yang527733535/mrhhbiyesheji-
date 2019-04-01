<template>
  <div>
    <h3>mumber</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num1: 1
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
<style lang="stylus" scoped>
</style>
