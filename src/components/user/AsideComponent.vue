<template>
    <el-aside width="200px">
        <el-menu>
            <el-menu-item index="1-1" @click="toHome">
          <el-icon> <HomeFilled /> </el-icon>系统首页
        </el-menu-item>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <Reading />
                    </el-icon>信息汇总
                </template>
                <el-menu-item index="2-1" @click="toQueryComments">查询评论</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="4">
                <template #title>
                    <el-icon>
                        <WarnTriangleFilled />
                    </el-icon>预警中心
                </template>
                <el-menu-item index="4-1" @click="toAutoEarlyWarn">自动预警</el-menu-item>
                <el-menu-item index="4-2" @click="toArtificialEarlyWarn">人工预警</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();

function toHome() {
    router.push({ path: '/user' });
}

function toQueryComments() {
    router.push({ path: '/user/query' });
}

function toAutoEarlyWarn() {
    router.push({ path: '/user/autoEarlyWarn' });
}

function toArtificialEarlyWarn() {
    router.push({ path: '/user/ArtificialEarlyWarn' });
}


</script>

<style scoped>
.el-aside {
    color: var(--el-text-color-primary);
    background: #edeff3;
    height: 950px;
    box-shadow:
        inset -1em -1em 3em rgba(219, 224, 219, 0.3),
        0 0 0 1px white,
        0.1em 0.3em 1em rgba(207, 202, 202, 0.6);
    border-radius: 10px;
}

.el-menu {
    border-right: none;
}

.el-sub-menu {
    box-shadow:
        inset -1em -1em 3em rgba(241, 238, 238, 0.3),
        0 0 0 1px white,
        0.3em 0.3em 1em rgba(224, 221, 221, 0.6);
    border-radius: 10px;
}

.el-menu-item {
    /* background: #ffffff; */
    box-shadow:
        inset -1em -1em 3em rgba(241, 238, 238, 0.3),
        0 0 0 1px white,
        0.3em 0.3em 1em rgba(224, 221, 221, 0.6);
    border-radius: 10px;
}
</style>
