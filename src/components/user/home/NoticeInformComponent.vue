<template>
    <el-main>
        <div class="main">
            <div class="carouse">
                <carouse></carouse>
            </div>
            <div class="info">
                <div>
                    <router-view />
                </div>
                <div class="noticelist">
                    <noticelist></noticelist>
                </div>
            </div>

        </div>

    </el-main>
</template>

<script setup>
import carouse from './CarouselComponent.vue'
import noticelist from './NoticeListComponent.vue'

</script>

<style scoped>
.el-main {
    height: 950px;
    margin-left: 10px;
    --el-main-padding: 0px;
}

.main {
    width: 100%;
    height: 950px;
    background-color: #f3f4f8;
    /* border: 1px solid #333; */
    /* 边框样式 */
    box-shadow:
        inset -1em -1em 3em rgba(200, 204, 200, 0.3),
        0 0 0 2px white,
        0.3em 0.3em 1em rgba(92, 91, 91, 0.6);
    border-radius: 10px;
    overflow: auto;
    /* 使用 auto 或 scroll 都可以显示滚动条 */
    /* overflow: hidden; */
}

.carouse {
    width: 1200px;
    margin: 20px auto;
    /* 设置左右 margin 为 auto */
}

.info {
    height: 350px;
    width: 1200px;
    margin: 20px auto;
}

.noticelist {
    height: 460px;
    width: 300px;
    background: #ffffff;
    float: right;
}
</style>