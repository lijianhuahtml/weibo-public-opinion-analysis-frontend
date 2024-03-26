<template>
    <el-header style="text-align: right; font-size: 12px">
        <div class="title">微博舆情分析系统</div>
        <div class="toolbar">
            <el-dropdown>
                <el-avatar :size="50" style="margin-right: 10px; margin-top: 0px" :src=$store.state.user.headImage />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="toUserInfo">个人信息</el-dropdown-item>
                        <el-dropdown-item @click="toCollect">个人收藏</el-dropdown-item>
                        <el-dropdown-item @click="toAlterPassword">修改密码</el-dropdown-item>
                        <el-dropdown-item @click="exitLogin">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <span style="font-size: 18px;">{{ $store.state.user.name }}</span>
        </div>
    </el-header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

const store = useStore();

const router = useRouter();

function toUserInfo() {
    router.push({ path: '/manager/userInfo' });
}

function toAlterPassword() {
    router.push({ path: '/manager/alterPassword' });
}

function toCollect() {
    router.push({ path: '/manager/collect' });
}

function exitLogin() {
    store.commit('setLevel', null);
    router.push({ path: '/login' });
}

</script>

<!--scoped表示局部作用域，该样式只针对某一个文件-->
<style scoped>
.el-header {
    position: relative;
    background-color: #edeff3;
    color: var(--el-text-color-primary);
    box-shadow:
        inset -1em -1em 3em rgba(196, 201, 196, 0.3),
        0 0 0 1px white,
        0.2em 0.2em 1em rgba(180, 176, 176, 0.6);
    border-radius: 10px;
}

.el-dropdown :hover {
    border: none;
    outline: none;
}

.el-dropdown :focus {
    outline: 0;
}

.title {
    display: inline;
    float: left;
    line-height: 60px;
    font-size: 30px;
    font-weight: 700;
}

.toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>