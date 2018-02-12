<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
}
.el-row{
  display: flex;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-row{
  display: flex;
}
// .school-logo{
//   width: 1rem;
//   height: 1rem;
// }
// .el-submenu .el-menu-item{
//   min-width: 0;
// }
</style>
