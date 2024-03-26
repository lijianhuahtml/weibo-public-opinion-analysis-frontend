<template>
    <el-main>
        <div class="main">
            <div class="table">
                <el-form :model="form" label-width="120px">
                    <!-- 隐藏的文件输入框 -->
                    <input type="file" id="fileInput" style="display: none" />
                    <el-avatar class="photo" :size="100" @click="openFileInput" :src=$store.state.user.headImage />
                    <el-form-item label="用户ID">
                        <el-input :disabled=true :value="$store.state.user.id" />
                    </el-form-item>
                    <el-form-item label="用户类型">
                        <el-input :disabled=true :value="$store.state.user.level == 0 ? '用户' : '管理员'" />
                    </el-form-item>
                    <el-form-item label="用户名称">
                        <el-input :disabled=isEdit v-model="form.username"
                            :value="isEdit ? $store.state.user.name : form.username" />
                    </el-form-item>
                    <el-form-item label="电子邮箱">
                        <el-input :disabled=true v-model="form.email"
                            :value="isEdit ? $store.state.user.email : form.email" />
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input :disabled=isEdit v-model="form.phone"
                            :value="isEdit ? $store.state.user.phone : form.phone" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="clickButton">{{ isEdit ? '修改信息' : '保存修改' }}</el-button>
                        <el-button type="primary" @click="cancelButton"
                            :style="{ display: isEdit ? 'none' : 'inline-block' }">取消修改</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>
    </el-main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import api from '../../../api/index';
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex';
import { checkFileSize, isValidUsername, isValidPhoneNumber, isValidEmail } from '../../../utils/check';

// do not use same name with ref
const form = reactive({
    username: '',
    email: '',
    phone: '',
});

const isEdit = ref(true);

const store = useStore();

function clickButton() {
    if (true === isEdit.value) {
        console.log("修改");
        isEdit.value = false;
        form.username = store.state.user.name;
        form.email = store.state.user.email;
        form.phone = store.state.user.phone;
    } else {
        if (!isValidUsername(form.username)) {
            ElNotification({
                message: '用户名在10个字符以内，不为空',
                type: 'error',
                position: 'bottom-left',
                duration: 3000
            });
        } else if ("" != form.phone && !isValidPhoneNumber(form.phone)) {
            ElNotification({
                message: '手机号格式不对',
                type: 'error',
                position: 'bottom-left',
                duration: 3000
            });
        } else if (!isValidEmail(form.email)) {
            ElNotification({
                message: '邮件格式不对，不为空',
                type: 'error',
                position: 'bottom-left',
                duration: 3000
            });
        } else {
            api.postUpdateUserInfo(store.state.user.id, form.username, form.email, form.phone).then(Response => {
                if (true === Response.data.data.isUpdate) {
                    const res = Response.data.data.user;
                    store.commit('setUsername', res.name);
                    store.commit('setEmail', res.email);
                    store.commit('setPhone', res.phone);

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



        isEdit.value = true;
    }
}

function cancelButton() {
    isEdit.value = true;
}

function openFileInput() {
    const fileInput = document.getElementById('fileInput'); // 请替换成你的文件输入框的实际ID

    if (fileInput) {
        fileInput.removeEventListener('change', handleFileChange);

        fileInput.click();

        // 添加新的事件监听器
        fileInput.addEventListener('change', handleFileChange);
    }

}

function handleFileChange() {

    const fileInput = document.getElementById('fileInput'); // 请替换成你的文件输入框的实际ID

    const file = fileInput.files[0];

    if (!checkFileSize(file.size)) {
        ElNotification({
            message: '上传失败,图片大小不能超过1MB',
            type: 'error',
            position: 'bottom-left',
            duration: 3000
        });
    } else {
        const formData = new FormData();
        formData.append('file', file);

        api.postUploadImage(formData, store.state.user.id).then(Response => {
            console.log(Response.data.data.isUpload)
            if (true === Response.data.data.isUpload) {
                store.commit('setUserImage', 'data:image/jpeg;base64,' + Response.data.data.photo);
                ElNotification({
                    message: '上传成功',
                    type: 'success',
                    position: 'bottom-left',
                    duration: 3000
                });
            } else {
                console.log("no");
                ElNotification({
                    message: '上传失败',
                    type: 'error',
                    position: 'bottom-left',
                    duration: 3000
                });
            }
        }, {
            responseType: 'arraybuffer',
        });
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
    height: 450px;
    background-color: #f3f4f8;
    /* border: 1px solid #333; */
    /* 边框样式 */
    box-shadow:
        inset -1em -1em 3em rgba(200, 204, 200, 0.3),
        0 0 0 2px white,
        0.3em 0.3em 1em rgba(92, 91, 91, 0.6);
    border-radius: 10px;
}

.table {
    width: 600px;
    height: 400px;
    margin-left: 100px;
}

.el-input {
    width: 250px;
}

.photo {
    margin-right: 120px;
    margin-top: 20px;
    margin-bottom: 20px;
    alt: var(--el-main-padding);
}
</style>