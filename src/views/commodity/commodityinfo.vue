<template>
  <div class="commodity-info">
    <p class="title">
      <el-button type="success"
                 style="position:absolute;left:15px;top:15px"
                 @click="goBack">返回</el-button>商品详情
    </p>
    <div class="shop-info">
      <el-divider>商品信息</el-divider>
      <el-form ref="form"
               label-width="120px"
               style="display:flex;flex-wrap:wrap;
               padding:0 50px">
        <el-form-item label="品牌名"
                      style="width:360px">
          {{baseInfo.brand?baseInfo.brand.brandName:''}}
        </el-form-item>
        <el-form-item label="商品编号"
                      style="width:360px">
          {{baseInfo.goods?baseInfo.goods.goodsSn:''}}
        </el-form-item>
        <el-form-item label="商品名称"
                      style="width:360px">
          {{baseInfo.goods?baseInfo.goods.goodsName:''}}
        </el-form-item>
        <el-form-item label="原价"
                      style="width:360px">
          {{baseInfo.goods?baseInfo.goods.marketPrice:''}}
        </el-form-item>
        <el-form-item label="售价"
                      style="width:360px">
          {{baseInfo.goods?baseInfo.goods.shopPrice:''}}
        </el-form-item>
        <el-form-item label="创建时间"
                      style="width:360px">
          {{baseInfo.goods?baseInfo.goods.createtime.slice(0,-4):''}}
        </el-form-item>
        <el-form-item label="商品状态"
                      style="width:360px">
          {{baseInfo.goods?getStatus(baseInfo.goods.status):''}}
        </el-form-item>
        <el-form-item label="寄卖人ID"
                      style="width:360px">
          {{baseInfo.goods?baseInfo.goods.sellerId:''}}
        </el-form-item>
        <el-form-item label="成色"
                      style="width:720px"
                      v-if="baseInfo.goods">
          <el-radio v-for="item in grade"
                    :key="item.label"
                    :label="item.label"
                    v-model="baseInfo.goods.grade"
                    disabled>{{item.text}}</el-radio>
        </el-form-item>
        <el-form-item label="试用人群"
                      v-if="baseInfo.goods">
          <el-radio v-for="item in fitPeople"
                    :key="item.label"
                    :label="item.label"
                    v-model="baseInfo.goods.fitPeople"
                    disabled>{{item.text}}</el-radio>
        </el-form-item>
        <el-form-item label="描述"
                      style="width:1080px"
                      v-if="baseInfo.goods">
          {{baseInfo.goods.goodsBrief}}
        </el-form-item>
      </el-form>
    </div>
    <div class="shop-img">
      <el-divider>商品图片</el-divider>
      <div class="img-list"
           style="width:80%;margin:auto">
        <el-popover placement="top"
                    v-for="item in baseInfo.pics"
                    :key="item.id"
                    title=""
                    trigger="hover">
          <img :src="`https://static1.ingluxury.com/${item.pic}`"
               alt=""
               style="width:400px;height:400px">
          <img :src="`https://static1.ingluxury.com/${item.pic}`"
               alt=""
               style="width:80px;height:80px;
           margin-right:20px"
               slot="reference"></el-popover>
      </div>

    </div>
  </div>
</template>

<script>
import {
  reactive,
  ref,
  onMounted,
  computed,
} from '@vue/composition-api';

export default {
  setup (props, { root }) {
    let baseInfo = reactive({})
    const grade = reactive([{
      label: 1,
      text: 'N1'
    },
    {
      label: 5,
      text: 'N2'
    },
    {
      label: 2,
      text: 'N3'
    },
    {
      label: 7,
      text: 'S1'
    },
    {
      label: 3,
      text: 'S2'
    },
    {
      label: 6,
      text: 'B1'
    },
    {
      label: 4,
      text: 'B2'
    }])
    const fitPeople = reactive([{
      label: 0,
      text: '通用'
    },
    {
      label: 1,
      text: '男'
    },
    {
      label: 2,
      text: '女'
    }])
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
    baseInfo = computed(() => root.$store.state.commodity.baseInfo)
    const goBack = () => {
      root.$router.push('/commodity/commoditylist')
    }
    onMounted(() => {
      root.$store.dispatch('getDetail', {
        id: root.$router.history.current.query.id
      });
    })
    return {
      baseInfo,
      grade,
      fitPeople,
      getStatus,
      goBack
    }
  }
}
</script>

<style lang="scss">
.commodity-info {
  .title {
    position: relative;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
  }
}
</style>