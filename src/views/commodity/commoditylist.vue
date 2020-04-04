<template>
  <div class="commodity-list">
    <div class="search-box">
      <div class="shop-type">商品状态</div>
      <el-select v-model="form.status"
                 placeholder="请选择"
                 size="mini"
                 @change="handleSearch"
                 style="margin-right:20px;width:150px">
        <el-option v-for="item in options"
                   :key="item.status"
                   :label="item.label"
                   :value="item.status">
        </el-option>
      </el-select>
      <el-input placeholder="商品编号"
                v-model="form.goodsSn"
                size="mini"
                style="width:250px;margin-right:20px"
                @keydown.enter.native="handleSearch">
        <template slot="prepend">商品编号</template>
      </el-input>
      <el-input placeholder="请输入卖家手机号"
                v-model="form.sellerPhone"
                size="mini"
                style="width:250px;margin-right:20px"
                @keydown.enter.native="handleSearch">
        <template slot="prepend">卖家手机号</template>
      </el-input>
      <el-input placeholder="请输入商品名称"
                v-model="form.goodsName"
                size="mini"
                style="width:250px;margin-right:20px"
                @keydown.enter.native="handleSearch">
        <template slot="prepend">商品名称</template>
      </el-input>
      <el-button size="mini"
                 style="background-color:#1da57a;color:white"
                 @click="handleSearch">搜索</el-button>
    </div>
    <el-col v-loading="loading">
      <div class="commodity-list-box">
        <div class="commodity-list-content">
          <div class="commodity-list-item"
               v-for="item in commodityList"
               :key="item.id">
            <div class="header-info">
              <div class="base-info">
                <p>商品编号 : {{ item.goods.goodsSn }}</p>
                <p>用户ID : {{ item.seller.userId }}</p>
                <p>用户名 : {{ item.seller.username }}</p>
                <p>卖家手机号 : {{ item.seller.phone }}</p>
              </div>
              <div class="status">
                商品状态 : {{ getStatus(item.goods.status) }}
              </div>
            </div>
            <div class="center-info">
              <div class="img-list">
                <img :src="ele.pic"
                     v-for="ele in item.goodsPics.slice(0, 5)"
                     :key="ele.id"
                     alt="" />
              </div>
              <div class="shop-info">
                <div class="shop-name">{{ item.goods.goodsName }}</div>
                <div class="shop-price">
                  <p class="sell-price">售价 : {{ item.goods.shopPrice }}</p>
                  <p class="original-price">
                    原价: <span>{{ item.goods.marketPrice }}</span>
                  </p>
                </div>
              </div>
              <div class="operation">
                <!-- <el-button type="success"
                           size="mini"
                           @click="editshop(item.goods.id)"
                           v-if="item.goods.status === 0 || item.goods.status === 4">编辑</el-button> -->
                <el-button type="primary"
                           size="mini"
                           @click="putawayhShop(item.goods.id)"
                           v-if="item.goods.status === 0 || item.goods.status === 4">上架</el-button>
                <el-button type="danger"
                           size="mini"
                           @click="deleteShop(item.goods.id)"
                           v-if="item.goods.status === 0 || item.goods.status === 4">删除</el-button>
                <el-button type="primary"
                           size="mini"
                           @click="watchShop(item.goods.id)">查看</el-button>
                <el-button type="success"
                           size="mini"
                           v-if="item.goods.status === 1"
                           @click="soldShop(item.goods.id)">售出</el-button>
                <el-button type="warning"
                           size="mini"
                           v-if="item.goods.status === 1"
                           @click="unshelfShop(item.goods.id)">下架</el-button>
                <el-button type="info"
                           size="mini"
                           v-if="item.goods.status === 1"
                           @click="lockShop(item.goods.id)">锁定</el-button>
                <el-button type="info"
                           size="mini"
                           v-if="item.goods.status === 2"
                           @click="lockShop(item.goods.id)">解锁</el-button>
              </div>
            </div>
            <div class="bottom-info">
              描述 : {{ item.goods.goodsBrief.slice(0, 80) }}...
            </div>
          </div>
        </div>
      </div>
    </el-col>

    <Pagination :page="pageSum"
                @commodityPage="changePage"
                ref="pagination"></Pagination>
  </div>
</template>

<script>
import { putaway, deletegoods, unShelf, lock, sold } from '@/api/index.js';
import Pagination from '@/Layout/components/Pagination.vue';
import {
  reactive,
  ref,
  onMounted,
  computed,
  toRefs,
  watch
} from '@vue/composition-api';

export default {
  components: {
    Pagination
  },
  setup (props, { root, refs }) {
    let commodityList = reactive([]);
    let form = reactive({
      goodsSn: '',
      sellerPhone: '',
      status: '',
      goodsName: ''
    });

    let loading = ref(true);
    let pageSum = ref(0);
    const options = reactive([
      {
        status: '',
        label: '全部'
      },
      {
        status: 0,
        label: '下架'
      },
      {
        status: 1,
        label: '上架'
      },
      {
        status: 2,
        label: '锁定'
      },
      {
        status: 3,
        label: '售出'
      },
      {
        status: 4,
        label: '待上架'
      },
      {
        status: 6,
        label: '被加入购物车'
      },
      {
        status: 7,
        label: '审批改价流程'
      },
      {
        status: 8,
        label: '改价中'
      },
      {
        status: 9,
        label: '付款中'
      },
      {
        status: 10,
        label: '待发货'
      },
      {
        status: 13,
        label: '收货失败'
      },
      {
        status: 11,
        label: '发货中'
      },
      {
        status: 14,
        label: '等待回退'
      },
      {
        status: 15,
        label: '回退中'
      },
      {
        status: 16,
        label: '回退完成'
      }
    ]);

    const changePage = current => {

      root.$store.dispatch('getCommodity', {
        page: current,
        size: 20,
        ...form
      });
    };
    const handleSearch = () => {
      refs.pagination.back();
      root.$store.dispatch('getCommodity', { page: 0, size: 20, ...form });
    };
    const getStatus = status => {
      switch (status) {
        case 0:
          return '下架';
        case 1:
          return '上架';
        case 2:
          return '锁定';
        case 3:
          return '售出';
        case 4:
          return '待上架';
        case 6:
          return '被加入购物车';
        case 7:
          return '审批改价流程';
        case 8:
          return '改价中';
        case 9:
          return '付款中';
        case 10:
          return '待发货';
        case 11:
          return '发货中';
        case 13:
          return '收货失败';
        case 14:
          return '等待回退';
        case 15:
          return '回退中';
        case 16:
          return '回退完成';
          break;
      }
    };
    const operation = res => {
      if (res.code === 0) {
        root.$store.dispatch('getCommodity', { page: 0, size: 20, ...form });
        root.$message({
          type: 'success',
          message: '操作成功'
        });
      } else {
        root.$message({
          type: 'error',
          message: '操作失败'
        });
      }
    };
    const lockShop = val => {
      lock({ id: val }).then(res => {
        operation(res);
      });
    };
    const unshelfShop = val => {
      unShelf({ ids: val }).then(res => {
        operation(res);
      });
    };
    const soldShop = val => {
      root
        .$prompt('请输入买家ID', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(({ value }) => {
          sold({ id: val, buyerId: value }).then(res => {
            operation(res);
          });
        });
    };
    const editShop = (val) => {
      root.$router.push({
        path: '/commodity/commodityedit',
        query: {
          id: val
        }
      })
    }
    const putawayhShop = val => {
      putaway({ ids: val }).then(res => {
        operation(res);
      });
    };
    const deleteShop = val => {
      root
        .$confirm('是否删除此商品?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        })
        .then(() => {
          deletegoods({ id: val }).then(res => {
            operation(res);
          });
        });
    };
    const watchShop = val => {
      root.$router.push({ path: `/commodity/commodityinfo?id=${val}` })
    }
    commodityList = computed(() => root.$store.state.commodity.commodityList);
    loading = computed(() => root.$store.state.commodity.loading);
    pageSum.value = computed(() => root.$store.state.commodity.pageSum);
    onMounted(() => {
      root.$store.dispatch('getCommodity', { page: 0, size: 20 });
    });
    return {
      commodityList,
      handleSearch,
      form,
      loading,
      getStatus,
      options,
      pageSum,
      changePage,
      putawayhShop,
      deleteShop,
      unshelfShop,
      lockShop,
      soldShop,
      editShop,
      watchShop
    };
  }
};
</script>

<style lang="scss" scope>
.commodity-list {
  height: 100%;

  .search-box {
    display: flex;
    padding: 10px 20px;
    background-color: white;
    .shop-type {
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
    }
  }
  .el-col {
    height: 100%;
    .commodity-list-box {
      height: 100%;
      overflow: auto;
      padding-bottom: 60px;
      &::-webkit-scrollbar {
        display: none;
      }
      .commodity-list-content {
        padding: 0 20px 110px 20px;
        overflow: hidden;
        .commodity-list-item {
          height: 200px;
          border: 1px #aaa solid;
          border-radius: 10px;
          margin-top: 10px;
          .header-info {
            height: 40px;
            background-color: #ecf5ff;
            border-radius: 10px 10px 0 0;
            position: relative;
            display: flex;
            .base-info {
              display: flex;
              p {
                color: #71717c;
                font-size: 14px;
                margin: 0 10px;
                line-height: 40px;
              }
            }
            .status {
              line-height: 40px;
              color: #71717c;
              font-size: 14px;
              position: absolute;
              right: 10px;
              top: 0;
            }
          }
          .center-info {
            height: 120px;
            position: relative;
            box-sizing: border-box;
            border-bottom: 1px solid #aaa;

            display: flex;
            padding: 10px;
            .img-list {
              width: 450px;
              img {
                height: 100%;
                width: 80px;
                margin-right: 5px;
              }
            }
            .shop-info {
              height: 100%;
              width: 300px;
              box-sizing: border-box;
              padding: 10px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              .shop-name {
                margin-bottom: 10px;
                color: #71717c;
                font-size: 14px;
              }
              .shop-price {
                color: #71717c;
                font-size: 14px;
                .original-price {
                  margin-top: 10px;
                  span {
                    text-decoration: line-through;
                  }
                }
              }
            }
            .operation {
              width: 300px;
              height: 100px;
              position: absolute;
              right: 10px;
              top: 10px;
              display: flex;
              align-items: center;
              justify-content: flex-end;
            }
          }
          .bottom-info {
            height: 40px;
            padding: 0 10px;
            background-color: white;
            border-radius: 0 0 10px 10px;
            line-height: 40px;
            color: #71717c;
            font-size: 14px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
