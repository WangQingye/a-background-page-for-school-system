<template>
  <div id="app">
    <img class="school-logo" src="assets/logo.jpg" alt="">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
  // @import './style/common';  
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
// .school-logo{
//   width: 1rem;
//   height: 1rem;
// }
// .el-submenu .el-menu-item{
//   min-width: 0;
// }
</style>
