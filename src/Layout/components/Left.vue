<template>
  <div class="left-nav">
    <div class="nav-header">
      <img :src="headerPic"
           alt="" />
      <div class="username">
        <span>{{ username }}</span><i @click="quit">退出</i>
      </div>
    </div>
    <el-menu class="el-menu-vertical-demo"
             background-color="#344a5f"
             text-color="#fff"
             :router="true"
             active-text-color="rgb(29, 165, 122)"
             :default-active="defaultIndex"
             style="width:200px">
      <el-submenu v-for="item in navList"
                  :key="item.id"
                  :index="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="ele in item.nav"
                        :key="ele.id"
                        :index="ele.path">{{ ele.title }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from '@vue/composition-api';
import { bus } from '@/utils/Bus.js';
export default {
  name: 'left',
  setup (props, { root }) {
    const navList = reactive([
      {
        id: '1',
        name: '用户管理',
        icon: 'el-icon-user',
        nav: [
          {
            id: '1-1',
            path: '/user/userlist',
            title: '用户列表'
          }
        ]
      },
      {
        id: '2',
        name: '商品管理',
        icon: 'el-icon-shopping-bag-2',
        nav: [

          {
            id: '2-1',
            path: '/commodity/commoditylist',
            title: '商品列表'
          },
        ]
      },
      {
        id: '3',
        name: '报表管理',
        icon: 'el-icon-document',
        nav: [

          {
            id: '3-1',
            path: '/report/orderreport',
            title: '订单报表'
          },

          {
            id: '3-2',
            path: '/report/consignreport',
            title: '寄卖报表'
          }
        ]
      },
      {
        id: '4',
        name: '图片管理',
        icon: 'el-icon-picture-outline',
        nav: [
          {
            id: '4-1',
            path: '/img/imgupload',
            title: '图片上传'
          },
        ]
      }
    ]);
    const username = ref('');
    const headerPic = ref(
      'https://static1.ingluxury.com/java/image/jpeg/boss_1583982604385.jpg'
    );
    let defaultIndex = ref('');
    const quit = () => {
      bus.remove('userId');
      bus.remove('username');
      bus.remove('token');
      root.$router.push('/login');
    };

    const defaultOpen = () => {
      navList.forEach(ele => {
        ele.nav.forEach((item, index) => {
          if (root.$route.path === item.path) {
            defaultIndex.value = item.path;
          }
        });
      });
    };
    onMounted(() => {
      username.value = bus.get('username');
      defaultOpen();
    });
    return {
      navList,
      // handleOpen,
      // handleClose,
      defaultIndex,
      headerPic,
      username,
      quit
    };
  }
};
</script>
<style lang="scss" scoped>
.left-nav {
  height: 100%;
  width: 200px;
  background-color: #344a5f;
  .nav-header {
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      height: 70px;
      width: 70px;
      border-radius: 50%;
    }
    .username {
      color: white;
      font-size: 14px;
      margin-top: 15px;
      i {
        color: rgb(29, 165, 122);
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
