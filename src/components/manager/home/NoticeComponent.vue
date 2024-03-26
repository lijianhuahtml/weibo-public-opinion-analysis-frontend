<template>
    <div class="notice">
        <div class="head">
            <div class="back">
                <el-button type="primary" class="button" @click="toImage">返回</el-button>
            </div>
            <div class="title">
                {{ $store.state.notice.title }}
            </div>
            <div class="time">
                发布时间: {{ extractDate($store.state.notice.time, $store.state.timeZone) }}
            </div>
        </div>
        <div class="body">
            <div class="content">
                <el-input v-model="$store.state.notice.content" style="width: 100%; font-size: 18px;" autosize disabled
                    resize="none" type="textarea" />
                <!-- <textarea class="text" id="myTextarea" rows="4" cols="10" readonly
                    :value="$store.state.notice.content"></textarea> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { extractDate } from '../../../utils/date'

const router = useRouter();

function toImage() {
    router.push({ path: '/manager/noticeInform/' });
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
    width: 880;
    height: 100px;
    border-bottom: 1px solid #ccc;
}

.back {
    float: left;
    width: 100px;
    height: 30px;
    margin-top: 10px;
}

.button {
    width: 80px;
    background: #22918b;
    color: #ffffff;
}

.title {
    float: left;
    width: 500px;
    height: 54px;
    margin-left: 100px;
    margin-top: 10px;
    font-size: 20px;

    white-space: normal;
    /* 允许换行 */
    overflow: hidden;
    /* 超过高度时隐藏溢出内容 */
    text-overflow: ellipsis;
    /* 超过宽度时添加省略号 */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* 限制显示的行数，根据实际情况调整 */
    -webkit-box-orient: vertical;
}

.time {
    float: right;
    width: 200px;
    height: 30px;
    margin-right: 20px;
    margin-top: 2px;
    line-height: 30px;
}

.body {
    width: 880px;
    height: auto;
    overflow: hidden;
}

.content {
    width: 860px;
    height: auto;
    margin: 20px auto;
}

.text {
    width: 100%;
    height: 100%;
    font-size: 18px;
    line-height: 1.5;
    resize: none;
    border: none;
    background: #f3f4f8;
    /* 设置文本域不可调整大小 */
    outline: none;
    /* 设置点击时不显示边框 */
}

::v-deep .el-textarea.is-disabled .el-textarea__inner {
    cursor: pointer;
    background-color: transparent;
    color: black;
    font-size: 18px;
}

::v-deep .comment_content .el-textarea.is-disabled .el-textarea__inner {
    font-size: 16px;
}
</style>