<template>
  <div class="main">
    <div class="contioner">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mains'
};
</script>

<style lang="scss" scoped>
.main {
  padding-top: 10px;
  background-color: #ddd;
  flex: 1;
  overflow: hidden;
  .contioner {
    height: 100%;
    width: 100%;
    background-color: white;
  }
}
</style>
