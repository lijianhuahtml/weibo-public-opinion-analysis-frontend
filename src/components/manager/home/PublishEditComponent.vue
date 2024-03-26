<template>
    <div class="notice">
        <div class="head">
            <div class="back">
                <div><el-button type="primary" class="button" :style="{ display: isEdit ? '' : 'none' }"
                        @click="remove">删除</el-button>
                </div>
                <div><el-button type="primary" class="button" :style="{ display: isEdit ? '' : 'none' }"
                        @click="edit">修改</el-button>
                </div>
                <div><el-button type="primary" class="button" :style="{ display: isEdit ? '' : 'none' }"
                        @click="toPublish">新建</el-button>
                </div>
                <div><el-button type="primary" class="button" :style="{ display: isEdit ? 'none' : '' }"
                        @click="cancelEdit">取消修改</el-button>
                </div>
                <div><el-button type="primary" class="button" :style="{ display: isEdit ? 'none' : '' }"
                        @click="update">保存修改</el-button>
                </div>
            </div>
            <div class="title">
                <el-input :disabled=isEdit v-model="form.title" :title="form.title" class="content" />
            </div>
        </div>
        <div class="body">
            <div class="content">
                <textarea :disabled=isEdit v-model="form.content" class="text" id="myTextarea" cols="10"></textarea>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import api from '../../../api';
import { reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { ElNotification } from 'element-plus'

const form = reactive({
    title: '',
    content: ''
})

const store = useStore();

const router = useRouter();

const isEdit = ref(true);

load();

function load() {
    // 初始赋值
    form.title = store.state.notice.title;
    form.content = store.state.notice.content;
}


// 监视store.state.notice的变化，更新form的值
watch(() => store.state.notice.id, () => {
    console.log("123")
    form.title = store.state.notice.title;
    form.content = store.state.notice.content;
});

function edit() {
    isEdit.value = false;
}

function cancelEdit() {
    isEdit.value = true;
    form.title = store.state.notice.title;
    form.content = store.state.notice.content;
}

function toPublish() {
    router.push({ path: '/manager/publishNoticeInform' });
}

function remove() {
    api.postDeleteNotice(store.state.notice.id).then(Response => {
        if (true === Response.data.data.isDelete) {
            ElNotification({
                message: '删除成功',
                type: 'success',
                position: 'bottom-left',
                duration: 3000
            });
            store.commit('setIsDeleteNotice', 'yes');
            // 刷新页面
            router.push({ path: '/manager/publishNoticeInform' });
        } else {
            ElNotification({
                message: '删除失败',
                type: 'error',
                position: 'bottom-left',
                duration: 3000
            });
        }
    })
}

function update() {
    api.postUpdateNotice(store.state.notice.id, store.state.user.id, form.title, form.content).then(Response => {
        if (true === Response.data.data.isUpdate) {
            const res = Response.data.data.notice;
            store.commit('setNoticeTitle', res.title);
            store.commit('setNoticeContent', res.content);
            store.commit('setNoticeTime', res.updateTime);
            ElNotification({
                message: '修改成功',
                type: 'success',
                position: 'bottom-left',
                duration: 3000
            });
            isEdit.value = true;
            // 刷新页面
            window.location.reload();
        } else {
            ElNotification({
                message: '修改失败',
                type: 'error',
                position: 'bottom-left',
                duration: 3000
            });
        }
    })
}


</script>

<style scoped>
.notice {
    float: left;
    width: 880px;
    height: 500px;
    margin-left: 10px;
}

.head {
    width: 880px;
    height: 100px;
    border-bottom: 1px solid #ccc;
}

.back {
    float: right;
    width: 300px;
    height: 30px;
    margin-top: 60px;
}

.button {
    float: right;
    width: 80px;
    margin-right: 5px;
    background: #22918b;
    color: #ffffff;
}

.title {
    float: left;
    width: 500px;
    height: 100px;
    font-size: 20px;
}

.title>.content {
    width: 500px;
    height: 50px;
    font-size: 18px;
    resize: none;
    white-space: normal;
    /* 允许换行 */
}

.body {
    width: 880px;
    height: 700px;
    overflow: hidden;
}

.content {
    width: 860px;
    height: 660px;
    margin: 20px auto;
    /* overflow: hidden; */
}

.text {
    width: 100%;
    height: 100%;
    font-size: 18px;
    line-height: 1.5;
    resize: none;
    border: 1px slategray solid;
    background: #f3f4f8;
    /* 设置文本域不可调整大小 */
    outline: none;
    /* 设置点击时不显示边框 */
}
</style>