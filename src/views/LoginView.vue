<template>
    <div>
        <el-container>
            <el-header class="header">微博舆情分析系统</el-header>
            <el-main class="main">
                <login></login>
            </el-main>
            <!-- <el-footer class="footer">Footer</el-footer> -->
        </el-container>
    </div>
</template>

<script setup>
import login from "../components/common/LoginComponent.vue";

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