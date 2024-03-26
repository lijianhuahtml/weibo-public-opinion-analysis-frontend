<template>
    <div class="common-layout">
        <myHeader></myHeader>
        <el-container class="body">
            <el-container>
                <userAside></userAside>
                <router-view />
            </el-container>
        </el-container>
    </div>
</template>

<!-- 这个 setup attribute 是一个标识，告诉 Vue 需要在编译时进行一些处理，
    让我们可以更简洁地使用组合式 API。比如，<script setup> 中的导入和顶层
    变量/函数都能够在模板中直接使用。
 -->
<script setup>
import userAside from "../components/manager/AsideComponent.vue"
import myHeader from "../components/manager/head/HeaderComponent.vue"

</script>

<style scoped>
.body {
    margin-top: 10px;
}
</style>

