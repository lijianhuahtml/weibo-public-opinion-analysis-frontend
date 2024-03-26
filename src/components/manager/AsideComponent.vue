<template>
  <el-aside width="200px">
    <el-menu>
        <el-menu-item index="1-1" @click="toHome">
          <el-icon> <HomeFilled /> </el-icon>系统首页
        </el-menu-item>



      <el-sub-menu index="2">
        <template #title>
          <el-icon> <Histogram /> </el-icon>信息汇总
        </template>
        <el-menu-item index="2-1" @click="toQueryComments"
          >查询评论</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon> <TrendCharts /> </el-icon>舆情分析
        </template>
        <el-menu-item index="3-1" @click="toHotManage">热词管理 </el-menu-item>
        <el-menu-item index="3-2" @click="toCloudManage">词云管理 </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon> <WarnTriangleFilled /> </el-icon>预警中心
        </template>
        <el-menu-item index="4-1" @click="toAutoEarlyWarn"
          >自动预警</el-menu-item
        >
        <el-menu-item index="4-2" @click="toArtificialEarlyWarn"
          >人工预警</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu index="5">
        <template #title>
          <el-icon> <Avatar /> </el-icon>用户管理
        </template>
        <el-menu-item index="5-1" @click="toUserManager">用户信息</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function toHome() {
  router.push({ path: "/manager" });
}

function toQueryComments() {
  router.push({ path: "/manager/query" });
}

function toHotManage() {
  router.push({ path: "/manager/hotManage" });
}

function toCloudManage() {
  router.push({ path: "/manager/cloudManage" });
}

function toAutoEarlyWarn() {
  router.push({ path: "/manager/autoEarlyWarn" });
}

function toArtificialEarlyWarn() {
  router.push({ path: "/manager/artificialEarlyWarn" });
}

function toUserManager() {
  router.push({ path: "/manager/userManager" });
}
</script>

<style scoped>
.el-aside {
  color: var(--el-text-color-primary);
  background: #edeff3;
  height: 950px;
  box-shadow: inset -1em -1em 3em rgba(219, 224, 219, 0.3), 0 0 0 1px white,
    0.1em 0.3em 1em rgba(207, 202, 202, 0.6);
  border-radius: 10px;
}

.el-menu {
  border-right: none;
}

.el-sub-menu {
  box-shadow: inset -1em -1em 3em rgba(241, 238, 238, 0.3), 0 0 0 1px white,
    0.3em 0.3em 1em rgba(224, 221, 221, 0.6);
  border-radius: 10px;
}

.el-menu-item {
  /* background: #ffffff; */
  box-shadow: inset -1em -1em 3em rgba(241, 238, 238, 0.3), 0 0 0 1px white,
    0.3em 0.3em 1em rgba(224, 221, 221, 0.6);
  border-radius: 10px;
}
</style>
