<template>
    <ul v-infinite-scroll="loadNoticeList" :infinite-scroll-disabled="disabled" class="infinite-list"
        style="overflow: auto">
        <li v-for="notice in noticeList" :key=notice class="infinite-list-item">
            <div class="notice">
                <div class="time">
                    <div class="day">{{ extractDay(notice.updateTime, timeZone.value) }}</div>
                    <div class="date">{{ extractYearAndMonth(notice.updateTime, timeZone.value) }}</div>
                </div>
                <div class="title">
                    <div class="content" id="textContainer" @click="toNotice(notice.id)">
                        <a>{{ notice.title }}</a>
                    </div>
                </div>
            </div>

        </li>
        <div class="nomore" v-show="isNull">没有更多数据</div>
    </ul>
</template>
  
<script setup>
import { reactive, ref } from 'vue'
import api from '../../../api';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import { ElNotification } from 'element-plus'
import { extractYearAndMonth, extractDay } from '../../../utils/date'

const router = useRouter();

const pager = ref(1);

const disabled = ref(false);

const isNull = ref(false);

const noticeList = reactive([]);

const timeZone = ref();

const store = useStore();

function loadNoticeList() {
    if (!isNull.value) {
        api.postGetNoticeList(pager.value, 10).then(Response => {
            if (!isNull.value) {
                timeZone.value = Response.data.data.TimeZone;
                Response.data.data.noticeList.forEach((value) => {
                    noticeList.push(value);
                });
            }
            if (Response.data.data.noticeList.length != 10) {
                isNull.value = true
            }
            pager.value++;
        })
    }

}

function toNotice(id) {
    api.postGetNotice(id).then(Response => {
        if (true === Response.data.data.isGet) {
            const res = Response.data.data.notice;
            store.commit('setNoticeId', res.id);
            store.commit('setNoticeTitle', res.title);
            store.commit('setNoticeContent', res.content);
            store.commit('setNoticeTime', res.updateTime);
            store.commit('setTimeZone', Response.data.data.timeZone);
        } else {
            ElNotification({
                message: '链接错误',
                type: 'error',
                position: 'bottom-left',
                duration: 3000
            });
        }
    })

    router.push({ path: '/manager/publishNoticeInform/edit' });
}



</script>
  
<style scoped>
.infinite-list {
    height: 100%;
    padding: 0px;
    margin: 0px;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 98px;
    background: #ffffff;
    width: 95%;
    margin: 0px auto;
    border-bottom: 1px dashed #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}

.carouse {
    width: 1200px;
    margin: 20px auto;
    /* 设置左右 margin 为 auto */
}

.notice {
    display: flex;
    width: 90%;
    height: 70%;
    align-items: center;
}

.time {
    float: left;
    height: 100%;
    width: 68px;
    background: #22918b;
}

.title {
    float: left;
    height: 85%;
    width: 140px;
    margin-left: 20px;
}

.day {
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin: 0px auto;
    margin-top: 5px;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
}

.date {
    width: 60px;
    height: 20px;
    margin: 0 auto;
    font-size: 12px;
    color: #ffffff;
}

.content {
    width: 100%;
    height: 90%;
    margin-top: 3px;
    background: #ffffff;

    font-size: 13px;
    color: #000;
    white-space: normal;
    /* 允许换行 */
    overflow: hidden;
    /* 超过高度时隐藏溢出内容 */
    text-overflow: ellipsis;
    /* 超过宽度时添加省略号 */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /* 限制显示的行数，根据实际情况调整 */
    -webkit-box-orient: vertical;
}

.content:hover {
    color: #22918b;
    cursor: pointer;
    /* 设置悬停时的光标样式为小手 */
}

.nomore {
    width: 273px;
    height: 40px;
    margin: 10px auto;
    font-size: 16px;
    line-height: 40px;
    /* background: #22918b; */
}
</style>
  