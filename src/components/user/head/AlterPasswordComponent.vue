<template>
    <el-main>
        <div class="main">
            <div class="table">
                <el-form :model="form" label-width="120px">
                    <el-form-item label="旧密码">
                        <el-input type="password" v-model="form.oldPassword" />
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input type="password" v-model="form.newPassword1" />
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input type="password" v-model="form.newPassword2" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePassword">修改密码</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </el-main>
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex';
import { ElNotification } from 'element-plus'
import { isValidPassword } from '../../../utils/check.js';
import api from '../../../api';


const form = reactive({
    oldPassword: '',
    newPassword1: '',
    newPassword2: '',
});

const store = useStore();

function updatePassword() {
    if (form.newPassword1 !== form.newPassword2) {
        ElNotification({
            message: '密码不一致',
            type: 'error',
            position: 'bottom-left',
            duration: 3000
        });
    } else if (!isValidPassword(form.newPassword1)) {
        ElNotification({
            message: '密码长度6-16位字符,包含数字与字母，不为空',
            type: 'error',
            position: 'bottom-left',
            duration: 3000
        });
    } else {
        api.postUpatePassword(store.state.user.id, form.oldPassword, form.newPassword1).then(Response => {
            if (true === Response.data.data.isUpdate) {
                ElNotification({
                    message: '修改成功',
                    type: 'success',
                    position: 'bottom-left',
                    duration: 3000
                });
            } else {
                ElNotification({
                    message: Response.data.data.message,
                    type: 'error',
                    position: 'bottom-left',
                    duration: 3000
                });
            }
        })
    }
}


</script>

<style scoped>
.el-main {
    height: 950px;
    margin-left: 10px;
    --el-main-padding: 0px;
}

.main {
    width: 100%;
    height: 250px;
    background-color: #f3f4f8;
    box-shadow:
        inset -1em -1em 3em rgba(200, 204, 200, 0.3),
        0 0 0 2px white,
        0.3em 0.3em 1em rgba(92, 91, 91, 0.6);
    border-radius: 10px;
    overflow: hidden;
}

.table {
    width: 600px;
    height: 300px;
    margin-left: 100px;
    margin-top: 30px;
}

.el-input {
    width: 250px;
}
</style>