<template>
    <div class="notice">
        <div class="head">
            <div class="back">
                <div><el-button type="primary" class="button" @click="publish">发布</el-button></div>
                <div><el-button type="primary" class="button" @click="reset">重置</el-button></div>
            </div>
            <div class="title">
                <el-input v-model="form.title" placeholder="标题" :title="form.title" class="content" />
            </div>
        </div>
        <div class="body">
            <div class="content">
                <textarea v-model="form.content" class="text" id="myTextarea" rows="4" cols="10"
                    placeholder="正文"></textarea>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import api from '../../../api';
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex';

const store = useStore();

load()

const form = reactive({
    title: '',
    content: ''
})

function load() {
    if (store.state.isDeleteNotice == 'yes') {
        store.commit('setIsDeleteNotice', 'no');
        // 刷新页面
        window.location.reload();
    }
}

function reset() {
    form.title = '';
    form.content = ''
}

function publish() {
    if (form.title == '' || form.content == '') {
        ElNotification({
            message: '发布信息不全',
            type: 'error',
            position: 'bottom-left',
            duration: 3000
        });
    } else {
        api.postPublishNotice(store.state.user.id, form.title, form.content).then(Response => {
            if (true === Response.data.data.isPublish) {
                ElNotification({
                    message: '发布成功',
                    type: 'success',
                    position: 'bottom-left',
                    duration: 3000
                });

                // 刷新页面
                window.location.reload();
            } else {
                ElNotification({
                    message: '发布失败',
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
    width: 200px;
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