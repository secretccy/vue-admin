<template>
  <div class="login">
    <div class="login-box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="ruleForm.username"
            style="width:300px"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="password">
          <el-input
            v-model="ruleForm.password"
            style="width:300px"
            :type="inputType"
            placeholder="请输入密码"
            @keydown.enter.native="toLogin"
          >
          </el-input>

          <img
            class="showimg"
            :src="inputType === 'password' ? unshowimg : showimg"
            alt=""
            @click="changeShowInput"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            style="width:300px;background-color:rgb(29, 165, 122);color:white"
            @click="toLogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from '@vue/composition-api';
import { login } from '@/api/index.js';
import { bus } from '@/utils/Bus';

export default {
  setup(props, { refs, parent, root }) {
    // 定义数据
    let inputType = ref('password');
    const unshowimg = ref(
      'https://static1.ingluxury.com/java/image/png/boss_1583803583433.png'
    );
    const showimg = ref(
      'https://static1.ingluxury.com/java/image/png/boss_1583803577993.png'
    );
    const ruleForm = reactive({
      username: '',
      password: ''
    });
    const rules = reactive({});
    // 定义函数
    const toLogin = async () => {
      if (ruleForm.username === '' || ruleForm.password === '') {
        root.$message({
          type: 'error',
          message: '用户名密码不能为空',
          duration: 1000
        });
      } else {
        const res = await login({
          username: ruleForm.username,
          password: ruleForm.password
        });
        if (res.code === 0) {
          const { username, token, userId } = res.data.userDetail;
          bus.set('username', username);
          bus.set('token', token);
          bus.set('userId', userId);
          root.$router.push('/home');
          root.$message({
            type: 'success',
            message: '登录成功',
            duration: 2000
          });
        }
      }
    };

    const changeShowInput = () => {
      if (inputType.value === 'password') {
        inputType.value = 'text';
      } else {
        inputType.value = 'password';
      }
    };
    // 生命周期
    onMounted(() => {
      bus.remove('username');
      bus.remove('token');
      bus.remove('userId');
    });
    return {
      ruleForm,
      rules,
      toLogin,
      inputType,
      unshowimg,
      showimg,
      changeShowInput
    };
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  width: 100%;
  background-color: #eee;
  overflow: hidden;
  .login-box {
    height: 400px;
    width: 600px;
    margin: 200px auto;
    display: flex;
    justify-content: center;
    .password {
      .el-form-item__content {
        position: relative;
        .showimg {
          height: 20px;
          width: 20px;
          position: absolute;
          right: 10px;
          top: 10px;
        }
      }
    }
  }
}
</style>
