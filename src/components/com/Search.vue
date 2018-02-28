<template>
  <div class="search">
    <el-input class="search-input" :placeholder="placeText" v-model="criteria" style="padding-bottom:10px;" @change="search">
    </el-input>
    <el-button type="primary" icon="el-icon-search" v-on:click="search">搜索</el-button>
  </div>
</template>



<script>
export default {
  props: {
    placeText: {
      type: String,
      default: '请输入搜索内容'
    }
  },
  data() {
    return {
      criteria: ""
    };
  },
  methods: {
    search(){
      this.$emit('search', this.criteria)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  width: 300px;
  float: right;
  margin-right: 5%;
}
.search-input {
  width: 200px;
}
</style>
