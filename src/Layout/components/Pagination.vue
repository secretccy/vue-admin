<template>
  <div class="pagination">
    <el-pagination background
                   layout="prev, pager, next,jumper"
                   :page-count="page.value"
                   @current-change="changePage"
                   :current-page.sync="current">
    </el-pagination>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
export default {
  name: 'pagination',
  props: ['page'],
  setup (props, { root, emit }) {
    let current = ref(1)
    const changePage = (val) => {
      switch (window.location.hash) {
        case '#/commodity/commoditylist':
          emit('commodityPage', val - 1);
        case '#/user/userlist':
          emit('userPage', val - 1);
        case '#/report/orderreport':
          emit('orderPage', val - 1);
        case '#/report/consignreport':
          emit('consignPage', val - 1);
        case '#/img/imgupload':
          emit('imgPage', val - 1);
      }

    }
    const back = () => {
      current.value = 1
    }
    return {
      changePage,
      current,
      back
    }

  }
}

</script>

<style lang="scss" >
.pagination {
  z-index: 10;
  background-color: white;
  border: 1px solid #ccc;
  padding: 5px 20px;
  position: fixed;
  right: 20px;
  bottom: 10px;
  .el-pagination {
    .el-pager {
      .active {
        background-color: #1da57a !important;
      }
      li {
        &:hover {
          color: #1da57a !important ;
        }
      }
    }
  }
}
</style>