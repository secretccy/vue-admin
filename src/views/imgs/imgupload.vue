<template>
  <div class="imgupload">
    <div class="imgupload-box">
      <el-upload
        class="upload-demo"
        drag
        action="https://boss-server.ingluxury.com/sys/sysFile/uploadFiles"
        multiple
        :on-success="handleSuccess"
        ref="table"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或<em style="color:rgb(29, 165, 122);">点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip" style="text-align:center">
          只能上传jpg/png/gif文件，且文件大小不超过2M
        </div>
      </el-upload>
    </div>
    <div class="imgupload-list">
      <el-table
        :data="imgList"
        border
        style="width: 100%;"
        v-loading="loading.val"
      >
        <el-table-column
          prop="headpic"
          label="图片预览"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <img
              :src="`https://static1.ingluxury.com/${scope.row.url}`"
              alt=""
              style="width:40px;height:40px;"
            />
          </template>
        </el-table-column>
        <el-table-column label="图片链接" width="500" align="center">
          <template slot-scope="scope">
            {{ 'https://static1.ingluxury.com/' + scope.row.url }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              style="color:rgb(29, 165, 122);margin-right:30px"
              @click="copyUrl(scope.row.url)"
              >复制链接</el-button
            >
            <el-button
              type="text"
              size="small"
              style="color:rgb(29, 165, 122)"
              @click="watchPic(scope.row.url)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagination @imgPage="changePage" :page="pageSum" ref="pagination">
    </Pagination>
  </div>
</template>

<script>
import Pagination from '@/Layout/components/Pagination.vue';
import { reactive, ref, onMounted, computed } from '@vue/composition-api';
export default {
  components: {
    Pagination
  },
  setup(props, { root, refs }) {
    let imgList = reactive([]);
    let pageSum = ref(0);
    let loading = reactive({
      val: true
    });
    const handleSuccess = () => {
      refs.pagination.back();
      root.$store.dispatch('getImg', { page: 0, size: 20 });
    };
    const changePage = val => {
      root.$store.dispatch('getImg', { page: val, size: 20 });
    };
    imgList = computed(() => root.$store.state.imgs.imgList);
    pageSum.value = computed(() => root.$store.state.imgs.pageSum);
    loading = computed(() => root.$store.state.imgs.loading);
    const copyUrl = url => {
      root.$copyText(`https://static1.ingluxury.com/${url}`).then(
        () => {
          root.$message({
            message: '复制成功',
            type: 'success'
          });
        },
        () => {
          root.$message({
            message: '复制失败',
            type: 'success'
          });
        }
      );
    };
    const watchPic = url => {
      window.open(`https://static1.ingluxury.com/${url}`);
    };
    onMounted(() => {
      root.$store.dispatch('getImg', { page: 0, size: 20 });
    });
    return {
      imgList,
      handleSuccess,
      changePage,
      pageSum,
      loading,
      copyUrl,
      watchPic
    };
  }
};
</script>

<style lang="scss" scoped>
.imgupload {
  padding: 20px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .imgupload-list {
    overflow: auto;
    padding: 0 0 80px 0;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
