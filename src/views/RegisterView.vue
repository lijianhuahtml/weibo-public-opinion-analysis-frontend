<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header">用户注册</el-header>
            <el-main class="main">
                <register></register>
            </el-main>
            <!-- <el-footer class="footer">Footer</el-footer> -->
        </el-container>
    </div>
</template>

<script setup>
import register from "../components/common/RegisterComponent.vue";

</script>


<style scoped>
.header {
    font-size: 35px;
    font-weight: 500;
    padding-top: 20px;
}

.main {
    margin-top: 10px;
    padding-right: 50px
}

.footer {
    margin-top: 200px;
}
</style>