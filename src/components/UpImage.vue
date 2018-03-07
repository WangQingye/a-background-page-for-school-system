<template>
    <div class="up-image">
        <p class="text">图片上传</p>
        <el-upload ref="upload" :with-credentials="true" :drag="true" accept="image/jpg, image/jpeg, image/png" class="upload-demo" :action="actionUrl" list-type="picture" style="width:800px;margin:0 auto" :on-remove="handleRemove" :on-success="handleSuccess" :before-upload="handleBefore">
            <div slot="tip" class="el-upload__tip" style="font-size:15px;margin-top:20px">图片上传用于小程序端首页展示，建议上传适合手机端展示的图片，只能上传jpg/png文件，且图片大小不超过5M，否则用户加载会很慢</div>
            <!-- <el-button type="primary" style="margin-top:100px">选取图片</el-button> -->
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>
            </div>
        </el-upload>
        <el-button type="success" style="margin-top:30px" @click="submitUpImages">确定上传</el-button>
    </div>
</template>
<script>
import { upImage } from "../api/getData";
import { baseUrl } from "../config/env";
export default {
  data() {
    return {
      urls: [],
      actionUrl: baseUrl + "/upfile/index"
    };
  },
  mounted() {},
  methods: {
    handleBefore(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
        return false;
      }
    },
    handleRemove(file, fileList) {
      this.urls.splice(
        this.urls.findIndex(item => {
          return item.name == file.name;
        }),
        1
      );
      console.log(this.urls);
    },
    handleSuccess(res, file) {
      this.urls.push({
        name: res.name,
        url: res.url
      });
    },
    async submitUpImages() {
      let urls = [];
      this.urls.forEach(item => {
        urls.push(item.url);
      });
      console.log(urls);
      let res = await upImage({
        urls: urls
      });
      if (res.ok) {
        this.$message({
          type: "success",
          message: "上传成功"
        });
        this.$refs.upload.clearFiles();
      } else {
        this.$message.error("上传错误");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text {
  font-size: 20px;
  font-weight: 600;
}
</style>
