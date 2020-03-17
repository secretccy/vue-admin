<template>
  <div class="header">
    请在<span>Chrome</span>浏览器中使用本系统
  </div>
</template>

<script>
export default {
  name: 'headers'
};
</script>

<style lang="scss" scoped>
.header {
  line-height: 60px;
  height: 60px;
  color: 18px;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: flex-end;
  span {
    color: #1da57a;
  }
}
</style>
