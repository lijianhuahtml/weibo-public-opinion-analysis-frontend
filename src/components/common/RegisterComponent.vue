<template>
    <el-form label-width="100px" :rules="rules" :model="user" style="max-width: 350px; margin: 0 auto; text-align: center">
        <el-form-item prop="username" label="用户名：">
            <el-input placeholder="请输入用户名" v-model="user.username" />
        </el-form-item>
        <el-form-item prop="phone" label="邮箱：">
            <el-input placeholder="请输入邮箱号" v-model="user.email" />
        </el-form-item>
        <el-form-item prop="password" label="密码：">
            <el-input type="password" placeholder="请输入密码" v-model="user.password" />
        </el-form-item>
        <el-form-item prop="password2" label="确认密码：">
            <el-input type="password" placeholder="请输入密码" v-model="user.password2" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
            <el-button type="primary" @click="toLogin">登录</el-button>
            <el-button native-type="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script setup>
import { reactive } from 'vue'
import api from '../../api';
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { isValidEmail, isValidUsername, isValidPassword } from '../../utils/check.js';

//初始化路由
const router = useRouter();

//数据
const user = reactive({
    username: 'admin2',
    email: '481802114@qq.com',
    password: '123123q',
    password2: '123123q',
});

//表单校验规则
const rules = reactive({
    username: [
        {
            required: true,
            message: '未填写用户名',
            trigger: 'blur'
        }
    ],
    email: [
        {
            required: true,
            message: '未填写手机号',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '未填写密码',
            trigger: 'blur'
        }
    ],
    password2: [
        {
            required: true,
            message: '未填写密码',
            trigger: 'blur'
        }
    ]
});

//登录方法
function register() {
    if (user.password !== user.password2) {
        ElNotification({
            message: '密码不一致',
            type: 'error',
            position: 'bottom-left',
            duration: 3000
        });
    } else if (('' === user.username || user.username == undefined) || ('' === user.password || user.password == undefined) || ('' === user.password2 || user.password2 == undefined) || ('' === user.email || user.email == undefined)) {
        ElNotification({
            message: '信息不完全',
            type: 'error',
            position: 'bottom-left',
            duration: 3000
        });
    } else if (!isValidEmail(user.email)) {
            ElNotification({
                message: '邮件格式不对，不为空',
                type: 'error',
                position: 'bottom-left',
                duration: 3000
            });
    } else if (!isValidUsername(user.username)) {
        ElNotification({
            message: '用户名在10个字符以内，不为空',
            type: 'error',
            position: 'bottom-left',
            duration: 3000
        });
    } else if (!isValidPassword(user.password)) {
        ElNotification({
            message: '密码长度6-16位字符,包含数字与字母，不为空',
            type: 'error',
            position: 'bottom-left',
            duration: 3000
        });
    } else {
        api.postRegister(user.username, user.password, user.email).then(Response => {
            if (Response.data.data.isSend) {
                ElNotification({
                    message: '邮件发送成功',
                    type: 'success',
                    position: 'bottom-left',
                    duration: 3000
                });
            } else {
                ElNotification({
                    message: Response.data.data.msg,
                    type: 'error',
                    position: 'bottom-left',
                    duration: 3000
                });
            }
        })
    }
}

function toLogin() {
    router.push({ path: '/login' });
}
</script>
  
  
  