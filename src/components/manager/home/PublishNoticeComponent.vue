<template>
    <el-main>
        <div class="main">
            <div class="info">
                <div>
                    <router-view />
                </div>
                <div class="noticelist">
                    <publishNoticeList></publishNoticeList>
                </div>
            </div>
        </div>
    </el-main>
</template>

<script setup>
import publishNoticeList from "./PublishNoticeListComponent.vue";

</script>

<style scoped>
.el-main {
    height: 950px;
    margin-left: 10px;
    --el-main-padding: 0px;
}

.main {
    width: 100%;
    height: 900px;
    background-color: #f3f4f8;
    /* border: 1px solid #333; */
    /* 边框样式 */
    box-shadow:
        inset -1em -1em 3em rgba(200, 204, 200, 0.3),
        0 0 0 2px white,
        0.3em 0.3em 1em rgba(92, 91, 91, 0.6);
    border-radius: 10px;
    overflow: auto;
}

.info {
    height: 800px;
    width: 1200px;
    margin: 20px auto;
}

.noticelist {
    height: 100%;
    width: 300px;
    background: #ffffff;
    float: right;
}
</style>