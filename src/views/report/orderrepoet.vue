<template>
  <div class="order">
    <div class="search-box-order">

      <span class="time">选择时间段</span>
      <el-date-picker v-model="time"
                      type="daterange"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      size="mini"
                      style="margin-right:20px"
                      @change="getTime"
                      :clearable="true">
      </el-date-picker>
      <el-input placeholder="请输入商品编号"
                v-model="form.goodsSn"
                size="mini"
                style="width:270px;margin-right:20px"
                @keydown.enter.native="handleSearch">
        <template slot="prepend">商品编号</template></el-input>
      <el-input placeholder="请输入买家手机号"
                v-model="form.buyerPhone"
                size="mini"
                style="width:250px;margin-right:20px"
                @keydown.enter.native="handleSearch">
        <template slot="prepend">买家手机号</template></el-input>
      <el-button size="mini"
                 style="background-color:#1da57a;color:white"
                 @click="handleSearch">搜索</el-button>
    </div>
    <div class="order-list">

      <el-table :data="orderList"
                style="width: 100%"
                border
                v-loading="loading.val">
        <el-table-column prop="orderSn"
                         label="订单号"
                         width="200"
                         align="center">
        </el-table-column>
        <el-table-column prop="goodsSn"
                         label="商品编号"
                         width="200"
                         align="center">
        </el-table-column>
        <el-table-column prop="goodsName"
                         label="商品名"
                         width="250"
                         align="center">
        </el-table-column>
        <el-table-column prop="actualPrice"
                         label="售价"
                         width="100"
                         align="center">
        </el-table-column>
        <el-table-column prop="buyerName"
                         label="买家名"
                         width="210"
                         align="center">
        </el-table-column>
        <el-table-column prop="buyerPhone"
                         label="买家手机号"
                         width="150"
                         align="center">
        </el-table-column>
        <el-table-column prop="createTimeText"
                         label="时间"
                         align="center"
                         fixed="right">
        </el-table-column>
      </el-table>
    </div>
    <Pagination :page="pageSum"
                @orderPage="changePage"
                ref="pagination"></Pagination>
  </div>

</template>

<script>
import Pagination from '@/Layout/components/Pagination.vue'
import { reactive, ref, onMounted, computed } from '@vue/composition-api';
export default {
  components: {
    Pagination
  },
  setup (props, { root, refs }) {
    let orderList = reactive([])
    let pageSum = ref(0)
    let form = reactive({
      goodsSn: '',
      buyerPhone: '',
      createTimeStart: '',
      createTimeEnd: ''
    })
    let loading = reactive({
      val: true
    })
    let time = reactive({})
    const getTime = async (val) => {
      form.createTimeStart = val[0].getTime()
      form.createTimeEnd = val[1].getTime()
      await handleSearch()
    }
    const handleSearch = () => {
      refs.pagination.back()
      root.$store.dispatch('getOrder', { page: 0, size: 25, ...form })
    }
    const changePage = (val) => {
      root.$store.dispatch('getOrder', { page: val, size: 25, ...form })
    }
    orderList = computed(() => root.$store.state.report.orderList)
    pageSum.value = computed(() => root.$store.state.report.pageSum)
    loading = computed(() => root.$store.state.report.loading)
    onMounted(() => {
      root.$store.dispatch('getOrder', { page: 0, size: 25 })
    })


    return {
      orderList,
      form,
      handleSearch,
      pageSum,
      changePage,
      loading,
      time,
      getTime
    }
  }
}
</script>

<style lang="scss" scope>
.order {
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  .search-box-order {
    padding: 10px 0 20px 0;
    font-size: 0;
    .time {
      display: inline-block;
      background-color: #f5f7fa;
      color: #909399;
      vertical-align: middle;
      position: relative;
      border: 1px solid #dcdfe6;
      line-height: 26px;
      padding: 0 20px;
      font-size: 12px;
      border-radius: 4px;
      white-space: nowrap;
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      vertical-align: top;
    }
  }
  .order-list {
    flex: 1;
    overflow: auto;
    padding: 0 0 70px 0;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>