<template>
  <div class="consign">
    <div class="search-box-consign">
      <div class="time">状态</div>
      <el-select
        v-model="form.status"
        placeholder="请选择"
        size="mini"
        @change="handleSearch"
        style="margin-right:20px;width:150px"
      >
        <el-option
          v-for="item in options"
          :key="item.status"
          :label="item.label"
          :value="item.status"
        >
        </el-option>
      </el-select>
      <span class="time">选择时间段</span>
      <el-date-picker
        v-model="time"
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="mini"
        style="margin-right:20px;width:300px"
        @change="getTime"
        :clearable="true"
      >
      </el-date-picker>
      <el-input
        placeholder="请输入寄卖编号"
        v-model="form.sn"
        size="mini"
        style="width:250px;margin-right:20px"
        @keydown.enter.native="handleSearch"
      >
        <template slot="prepend">寄卖编号</template></el-input
      >
      <el-input
        placeholder="请输入寄卖人手机号"
        v-model="form.sellerPhone"
        size="mini"
        style="width:260px;margin-right:20px"
        @keydown.enter.native="handleSearch"
      >
        <template slot="prepend">寄卖人手机号</template></el-input
      >
      <el-button
        size="mini"
        style="background-color:#1da57a;color:white"
        @click="handleSearch"
        >搜索</el-button
      >
    </div>
    <div class="consign-list">
      <el-table
        :data="consignList"
        style="width: 100%"
        border
        v-loading="loading.val"
      >
        <el-table-column prop="sn" label="寄卖编号" width="200" align="center">
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="类目"
          width="160"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="expectPrice"
          label="期望价"
          width="160"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="sellerName"
          label="寄卖人姓名"
          width="250"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="sellerPhone"
          label="寄卖人手机号"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createTimeText"
          label="寄卖时间"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="statusText"
          label="状态"
          align="center"
          fixed="right"
        >
        </el-table-column>
      </el-table>
    </div>
    <Pagination
      :page="pageSum"
      @consignPage="changePage"
      ref="pagination"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from '@/Layout/components/Pagination.vue';
import {
  reactive,
  ref,
  onMounted,
  computed,
  watch
} from '@vue/composition-api';
export default {
  components: {
    Pagination
  },
  setup(props, { root, refs }) {
    let consignList = reactive([]);
    let pageSum = ref(0);
    let form = reactive({
      status,
      sn: '',
      sellerPhone: '',
      createTimeStart: '',
      createTimeEnd: ''
    });
    const options = reactive([
      {
        status: '',
        label: '全部'
      },
      {
        status: 20,
        label: '待审核'
      },
      {
        status: 30,
        label: '待寄送'
      },
      {
        status: 40,
        label: '寄送中'
      },
      {
        status: 50,
        label: '寄送完成'
      },
      {
        status: 60,
        label: '待鉴定'
      },
      {
        status: 70,
        label: '已鉴定'
      },
      {
        status: 80,
        label: '待上架'
      },
      {
        status: 90,
        label: '已上架'
      },
      {
        status: 100,
        label: '已下架'
      },
      {
        status: 110,
        label: '改价中'
      },
      {
        status: 120,
        label: '已售出'
      },
      {
        status: 130,
        label: '已关闭'
      },
      {
        status: 140,
        label: '鉴定不通过'
      },
      {
        status: 150,
        label: '等待回退'
      },
      {
        status: 160,
        label: '回退中'
      },
      {
        status: 170,
        label: '回退完成'
      },
      {
        status: 180,
        label: '审核不通过'
      },
      {
        status: 190,
        label: '收货失败'
      },
      {
        status: 200,
        label: '不符合预期'
      }
    ]);
    let loading = reactive({
      val: true
    });
    let time = reactive({});
    const getTime = async val => {
      if (val === null) {
        form.createTimeStart = '';
        form.createTimeEnd = '';
      } else {
        form.createTimeStart = val[0].getTime();
        form.createTimeEnd = val[1].getTime();
      }
      await handleSearch();
    };
    const handleSearch = () => {
      refs.pagination.back();
      root.$store.dispatch('getConsign', { page: 0, size: 25, ...form });
    };
    const changePage = val => {
      root.$store.dispatch('getConsign', { page: val, size: 25, ...form });
    };
    consignList = computed(() => root.$store.state.report.consignList);
    pageSum.value = computed(() => root.$store.state.report.pageSum);
    loading = computed(() => root.$store.state.report.loading);

    onMounted(() => {
      root.$store.dispatch('getConsign', { page: 0, size: 25 });
    });

    return {
      consignList,
      form,
      handleSearch,
      pageSum,
      changePage,
      loading,
      time,
      getTime,
      options
    };
  }
};
</script>

<style lang="scss" scope>
.consign {
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  .search-box-consign {
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
  .consign-list {
    flex: 1;
    overflow: auto;
    padding: 0 0 70px 0;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
