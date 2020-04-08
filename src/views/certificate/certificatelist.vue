<template>
  <div class="certificate-list">
    <div class="search">

    </div>
    <div class="list">
      <el-table :data="certificateList"
                border
                style="width: 100%;position: absolute;">
        <el-table-column fixed
                         label="创建时间"
                         width="250"
                         align="center">
          <template slot-scope="scope">
            {{ scope.row.createtime.slice(0,-3)}}
          </template>
        </el-table-column>
        <el-table-column prop="sn"
                         label="证书编号"
                         width="220"
                         align="center">
        </el-table-column>
        <el-table-column prop="proposer"
                         label="申请人姓名"
                         width="250"
                         align="center">
        </el-table-column>
        <el-table-column prop="applicantPhone"
                         label="申请人联系方式"
                         width="250"
                         align="center">
        </el-table-column>
        <el-table-column prop="applicantAddress"
                         label="申请人地址"
                         width="300"
                         align="center">
        </el-table-column>
        <el-table-column prop="brand"
                         label="品牌"
                         width="150"
                         align="center">
        </el-table-column>
        <el-table-column prop="model"
                         label="型号"
                         width="120"
                         align="center">
        </el-table-column>
        <el-table-column prop="model"
                         label="生产序号"
                         width="120"
                         align="center">
        </el-table-column>
        <el-table-column prop="model"
                         label="材质颜色"
                         width="120"
                         align="center">
        </el-table-column>
        <el-table-column prop="type"
                         label="鉴定类型"
                         width="120"
                         align="center">
        </el-table-column>
        <el-table-column prop="gist"
                         label="鉴定依据"
                         width="150"
                         align="center">
        </el-table-column>
        <el-table-column prop="conclusion"
                         label="鉴定结论"
                         width="150"
                         align="center">
        </el-table-column>
        <el-table-column prop="price"
                         label="鉴定价格"
                         width="120"
                         align="center">
        </el-table-column>
        <el-table-column label="图片预览"
                         width="300"
                         align="center">
          <template slot-scope="scope">
            <img :src="item"
                 alt=""
                 v-for="(item,index) in JSON.parse(scope.row.imgJson)"
                 :key="index"
                 style="width:50px;height:50px;margin-right:20px" />

          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="200"
                         align="center">
          <template slot-scope="scope">
            <el-button type="success"
                       size="small"
                       @click="create(scope.row.id)"
                       :disabled="scope.row.filePath?true:false">生成</el-button>
            <el-button type="primary"
                       size="small"
                       @click="openPdf(scope.row.filePath)"
                       :disabled="scope.row.filePath?false:true">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagination @certificatePage="changePage"
                :page="pageSum"
                ref="pagination">
    </Pagination>
  </div>
</template>

<script>
import {
  reactive,
  ref,
  onMounted,
  computed,
} from '@vue/composition-api';
import Pagination from '@/Layout/components/Pagination.vue';
import { createPdf } from '@/api'
export default {
  components: {
    Pagination
  },
  setup (props, { root }) {
    let certificateList = reactive([])
    let pageSum = ref(0)
    const changePage = current => {
      root.$store.dispatch('getCertificate', { page: current, size: 6 });
    };
    const create = (val) => {
      createPdf({ id: val }).then(res => {
        if (res.code === 0) {
          root.$message({
            message: '操作成功',
            type: 'success'
          });
        } else {
          root.$message({
            message: '操作失败',
            type: 'error'
          });
        }
      })
    }
    const openPdf = (val) => {
      if (val) {
        window.open(val)
      } else {
        root.$message({
          message: '需要先生成文件',
          type: 'warning'
        });
      }
    }
    certificateList = computed(() => root.$store.state.certificate.certificateList)
    pageSum.value = computed(() => root.$store.state.certificate.pageSum)
    onMounted(() => {
      root.$store.dispatch('getCertificate', { page: 0, size: 6 });
    })
    return {
      certificateList,
      pageSum,
      changePage,
      create,
      openPdf
    }
  }
}
</script>

<style lang="scss">
.certificate-list {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px 20px 60px 20px;
  .list {
    width: 100%;
    height: 100%;

    position: relative;
  }
  .search {
    height: 50px;
  }
}
</style>