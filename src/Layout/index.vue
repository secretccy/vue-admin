<template>
  <div class="layout">
    <Left></Left>
    <div class="right">
      <Head></Head>
      <Mains></Mains>
    </div>
  </div>
</template>

<script>
import Mains from './components/Main.vue'
import Head from './components/Header.vue'
import Left from './components/Left.vue'
export default {
  name: 'layout',
  components: { Mains, Left, Head }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  width: 100%;
  display: flex;
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>