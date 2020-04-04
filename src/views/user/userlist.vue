<template>
  <div class="user">
    <div class="search-box-user">
      <el-input placeholder="请输入用户名"
                v-model="form.user_name"
                size="mini"
                style="width:300px;margin-right:20px"
                @keydown.enter.native="handleSearch">
        <template slot="prepend">用户名</template>
      </el-input>
      <el-input placeholder="请输入手机号"
                v-model="form.phone"
                size="mini"
                style="width:300px;margin-right:20px"
                @keydown.enter.native="handleSearch">
        <template slot="prepend">手机号</template></el-input>
      <el-button size="mini"
                 style="background-color:#1da57a;color:white"
                 @click="handleSearch">搜索</el-button>
    </div>
    <div class="user-list">
      <el-table :data="userList"
                border
                style="width: 100%;"
                v-loading="flag.loading">
        <el-table-column prop="userId"
                         label="用户ID"
                         width="170"
                         align="center"></el-table-column>
        <el-table-column prop="headpic"
                         label="用户头像"
                         width="150"
                         align="center"><template slot-scope="scope">
            <img v-lazy="getSrc(scope.row)"
                 alt=""
                 style="width:40px;height:40px;border-radius:50%" />
          </template>
        </el-table-column>
        <el-table-column prop="username"
                         label="用户名"
                         width="300"
                         align="center">
        </el-table-column>
        <el-table-column prop="phone"
                         label="手机号"
                         width="200"
                         align="center">
        </el-table-column>
        <el-table-column label="注册时间"
                         width="250"
                         align="center">
          <template slot-scope="scope">
            {{ getTime(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         fixed="right">
          <template slot-scope="scope">
            <el-button @click="open(scope.row, 'attention')"
                       type="text"
                       size="small"
                       style="color:rgb(29, 165, 122);margin-right:30px">关注列表</el-button>
            <el-button type="text"
                       size="small"
                       @click="open(scope.row, 'fans')"
                       style="color:rgb(29, 165, 122)">粉丝列表</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-drawer :visible.sync="flag.drawer"
               :with-header="false"
               size="35%">
      <p style="font-size:18px;line-height:40px;text-align:center">
        {{ listType === 'attention' ? '关注列表' : '粉丝列表' }}
      </p>
      <div style="padding:0 20px">
        <el-table :data="list"
                  style="width: 100%"
                  border>
          <el-table-column prop="userId"
                           label="用户ID"
                           width="150"
                           align="center">
          </el-table-column>
          <el-table-column prop="userName"
                           label="用户名"
                           width="240"
                           align="center">
          </el-table-column>
          <el-table-column prop="userPhone"
                           label="手机号"
                           align="center">
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
    <Pagination @userPage="changePage"
                :page="pageSum"
                ref="pagination">
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
  setup (props, { root, refs }) {
    const baseSrc = ref('https://static1.ingluxury.com/');
    let userList = reactive([]);
    let list = reactive([]);
    let form = reactive({
      user_name: '',
      phone: ''
    });
    let pageSum = ref(0);
    let listType = ref('attention');
    let flag = reactive({
      drawer: false,
      loading: true
    });
    const getTime = data => {
      let date = new Date(parseInt(data.createtime));
      let Y = date.getFullYear() + '-';
      let M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-';
      let D = date.getDate() + ' ';
      let h = date.getHours() + ':';
      let m = date.getMinutes() + ':';
      let s = date.getSeconds();
      return Y + M + D + h + m + s;
    };
    const getSrc = data => {
      if (data.avatar.split('/')[0] === 'http:') {
        return data.avatar;
      } else {
        return baseSrc.value + data.avatar;
      }
    };
    const handleSearch = () => {
      refs.pagination.back();
      root.$store.dispatch('getUser', { page: 0, size: 20, ...form });
    };
    const changePage = current => {
      root.$store.dispatch('getUser', { page: current, size: 20, ...form });
    };
    const open = (data, type) => {
      if (type === 'attention') {
        listType.value = 'attention';
        root.$store.dispatch('getAttention', { userId: data.userId });
      } else {
        listType.value = 'fans';
        root.$store.dispatch('getFans', { userId: data.userId });
      }
    };
    userList = computed(() => root.$store.state.user.userList);
    list = computed(() => root.$store.state.user.list);
    flag = computed(() => root.$store.state.user.flag);
    pageSum.value = computed(() => root.$store.state.user.pageSum);
    onMounted(() => {
      root.$store.dispatch('getUser', { page: 0, size: 20 });
    });
    return {
      userList,
      getTime,
      getSrc,
      form,
      handleSearch,
      open,
      flag,
      list,
      listType,
      changePage,
      pageSum
    };
  }
};
</script>

<style lang="scss" scoped>
.user {
  height: 100%;
  width: 100%;
  padding: 10px 20px 60px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .user-list {
    flex: 1;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .search-box-user {
    display: flex;
    margin-bottom: 30px;
    background-color: white;
  }
}
</style>
