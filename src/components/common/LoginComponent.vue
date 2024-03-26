<template>
  <el-form label-width="100px" :model="user" style="max-width: 350px; margin: 0 auto; text-align: center">
    <el-form-item prop="username" label="账号：">
      <el-input placeholder="请输入用户名" v-model="user.username" />
    </el-form-item>
    <el-form-item prop="password" label="密码：">
      <el-input type="password" placeholder="请输入密码" v-model="user.password" @keyup.enter="login" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="primary" @click="toRegister">注册</el-button>
      <el-button native-type="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'
import api from '../../api';
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import jsCookie from 'js-cookie';
import { useStore } from 'vuex';

// 1. export与export default均可用于导出常量、函数、文件、模块等
// 2. 可以在其它文件或模块中通过import+(常量|函数|文件|模块)名的方式，将其导入，以便能够对其进行使用
// 3. 在一个文件或模块中，export、import可以有多个，export default仅有一个
// 4. 通过export方式导出，在导入时要加{},export default则不需要

//初始化路由
const router = useRouter();

const store = useStore();

//数据
const user = reactive({
  username: 'admin',
  password: '123123q'
});

//登录方法
function login() {
  api.postLogin(user.username, user.password).then(Response => {
    if (true === Response.data.data.isLogin) {
      const res = Response.data.data.user;
      const token = Response.data.data.token;
      store.commit('setUserToken', token);
      store.commit('setUserImage', 'data:image/jpeg;base64,' + Response.data.data.photo);
      store.commit('setUserId', res.id);
      store.commit('setUsername', res.name);
      store.commit('setEmail', res.email);
      store.commit('setPhone', res.phone);
      store.commit('setLevel', res.level);
      //路由跳转
      jsCookie.set('username', user.username, { expires: 1 });

      if (res.level === 0) {
        router.push({ path: '/user' });
      } else {
        router.push({ path: '/manager' });
      }

      ElNotification({
        message: '登录成功',
        type: 'success',
        position: 'bottom-left',
        duration: 3000
      });
    } else {
      ElNotification({
        message: '登录失败！账号或密码错误',
        type: 'error',
        position: 'bottom-left',
        duration: 3000
      });
    }
  })
}

function toRegister() {
  router.push({ path: '/register' });
}

</script>


