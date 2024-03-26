<template>
    <el-main>
        <div class="main">
            <div class="select">
                <div class="select-content">
                    <el-form :model="form" label-width="80px">
                        <div class="float">
                            <el-form-item label="关键字" style="font-size;: 50px">
                                <el-input v-model="form.keyword" />
                            </el-form-item>
                            <el-form-item label="地区">
                                <el-input v-model="form.area" />
                            </el-form-item>
                            <el-form-item label="帖子">
                                <el-input v-model="form.url" />
                            </el-form-item>
                            <el-form-item label="" width="200px">
                                <el-select v-model="form.sort" placeholder="选择时间远近" style="width: 200px">
                                    <el-option label="" value="" />
                                    <el-option label="由之前到最近" value="asc" />
                                    <el-option label="由最近到之前" value="desc" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="时间" width="200px">
                                <el-select v-model="form.dateType" placeholder="选择时间类型" style="width: 200px">
                                    <el-option label="时间范围" value="scope" />
                                    <el-option label="某天之内" value="day" />
                                    <el-option label="某天至今" value="time" />
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="float2">

                            <el-form-item label="开始时间" :style="{ display: form.dateType === 'scope' ? '' : 'none' }">
                                <el-col :span="11">
                                    <el-date-picker v-model="form.startTime1" type="date" placeholder="Pick a date"
                                        style="width: 150px" />
                                </el-col>
                                <el-col :span="2" class="text-center">
                                    <span class="text-gray-500">-</span>
                                </el-col>
                                <el-col :span="11">
                                    <el-time-picker class="margin-right" v-model="form.startTime2" placeholder="Pick a time"
                                        style="width: 150px" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="结束时间" :style="{ display: form.dateType === 'scope' ? '' : 'none' }">
                                <el-col :span="11">
                                    <el-date-picker v-model="form.endTime1" type="date" placeholder="Pick a date"
                                        style="width: 150px" />
                                </el-col>
                                <el-col :span="2" class="text-center">
                                    <span class="text-gray-500">-</span>
                                </el-col>
                                <el-col :span="11">
                                    <el-time-picker v-model="form.endTime2" placeholder="Pick a time"
                                        style="width: 150px" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="某天时间" :style="{ display: form.dateType === 'day' ? '' : 'none' }">
                                <el-col :span="11">
                                    <el-date-picker v-model="form.someTime" type="date" placeholder="Pick a date"
                                        style="width: 200px" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="开始时间" :style="{ display: form.dateType === 'time' ? '' : 'none' }">
                                <el-col :span="11">
                                    <el-date-picker v-model="form.hithertoTime" type="date" placeholder="Pick a date"
                                        style="width: 200px" />
                                </el-col>
                            </el-form-item>
                        </div>
                        <div class="float">
                            <div class="button">
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                                <el-button @click="resetForm(form)">重置</el-button>
                            </div>

                        </div>

                    </el-form>
                </div>
            </div>
            <div class="table">
                <div class="table-content">
                    <el-table :data="tableData" height="720" border highlight-current-row stripe style="width: 100%"
                        align="center">
                        <el-table-column type="index" label="序号" :index="(page.currentPage - 1) * page.pageSize + 1"
                            width="70" align="center" />
                        <el-table-column prop="time" label="发表时间" width="168px" align="center" :resizable="false">
                            <template #default="{ row }">
                                {{ extractDate(row.time, timeZone) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="content" label="评论内容" width="750px" align="center" :resizable="false" />

                        <el-table-column prop="emotion" label="情感" width="100px" align="center" :resizable="false">
                            <template #default="{ row }">
                                <el-tag :type="row.emotion >= 0.6 ? 'success' : 'danger'" disable-transitions>{{
                                    row.emotion >= 0.6 ? '积极' : '消极' }}</el-tag>
                            </template>
                        </el-table-column>

                        <el-table-column prop="area" label="地区" width="130px" align="center" :resizable="false" />

                        <el-table-column prop="url" label="帖子URL" width="100px" show-overflow-tooltip align="center"
                            :resizable="false">
                            <template #default="{ row }">
                                <a :href=row.url target="_blank">{{
                                    row.url }}</a>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="100px" align="center" :resizable="false">
                            <template #default="{ row }">
                                <el-button type="primary" size="small" @click="collect(row.id)">收藏</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="page-content">
                    <div class="demo-pagination-block">
                        <el-pagination :style="{ display: page.total === 0 ? 'none' : '' }"
                            v-model:current-page="page.currentPage" v-model:page-size="page.pageSize"
                            layout="prev, pager, next, jumper" :total="page.total" @current-change="handleCurrentChange" />
                    </div>
                </div>
            </div>
        </div>

    </el-main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import api from '../../../api';
import { extractDate } from '../../../utils/date'
import { useStore } from 'vuex';
import { ElNotification } from 'element-plus'

const store = useStore();

const page = reactive({
    currentPage: 1,
    pageSize: 50,
    total: 0,
});

const timeZone = ref();


// do not use same name with ref
const form = reactive({
    keyword: '',
    url: '',
    area: '',
    dateType: '',
    sort: '',
    startTime1: null,
    startTime2: null,
    endTime1: null,
    endTime2: null,
    someTime: null,
    hithertoTime: null,
});

const tableData = reactive([]);

const onSubmit = () => {
    queryComment(1, page.pageSize);
}

const handleCurrentChange = (val) => {
    page.currentPage = val;
    queryComment(val, page.pageSize);

}

load();

function load() {
    queryComment(1, page.pageSize);
}

function queryComment(pager, size) {

    const endStart = ref('');
    const endEnd = ref('');
    const endSome = ref('');
    const endHitherto = ref('');

    if (null != form.startTime1 && '' !== form.startTime1 && null != form.startTime2 && '' !== form.startTime2) {
        form.startTime1.setHours(form.startTime2.getHours());
        form.startTime1.setMinutes(form.startTime2.getMinutes());
        form.startTime1.setSeconds(form.startTime2.getSeconds());
        endStart.value = form.startTime1.toDateString() + " " + form.startTime1.toTimeString();
    }

    if (null != form.endTime1 && '' !== form.endTime1 && null != form.endTime2 && '' !== form.endTime2) {
        form.endTime1.setHours(form.endTime2.getHours());
        form.endTime1.setMinutes(form.endTime2.getMinutes());
        form.endTime1.setSeconds(form.endTime2.getSeconds());
        endEnd.value = form.endTime1.toDateString() + " " + form.endTime1.toTimeString();
    }

    if (null != form.hithertoTime && '' !== form.hithertoTime) {
        endHitherto.value = form.hithertoTime.toString();
    }
    if (null != form.someTime && '' !== form.someTime) {
        endSome.value = form.someTime.toString();
    }

    api.postEarlyWarnCommentList(pager, size, form.keyword, form.area, form.url, form.sort, 0, form.dateType,
        endStart.value, endEnd.value, endSome.value, endHitherto.value).then(Response => {
            if (true === Response.data.data.isGet) {
                tableData.length = 0;
                timeZone.value = Response.data.data.TimeZone;
                page.total = Response.data.data.total;
                Response.data.data.commentList.forEach((value) => {
                    tableData.push(value);
                });
            } else {
                tableData.length = 0;
            }

        })
}

function resetForm() {
    form.keyword = '',
        form.area = '',
        form.url = '',
        form.dateType = '',
        form.startTime1 = '',
        form.startTime2 = '',
        form.endTime1 = '',
        form.endTime2 = '',
        form.someTime = '',
        form.hithertoTime = '',
        form.emotion = '',
        form.sort = ''
}

function collect(commentId) {
    api.postCollectComment(store.state.user.id, commentId).then(Response => {
        if (true === Response.data.data.isCollect) {
            ElNotification({
                message: '收藏成功',
                type: 'success',
                position: 'bottom-left',
                duration: 3000
            });
        } else {
            ElNotification({
                message: '已收藏',
                type: 'success',
                position: 'bottom-left',
                duration: 3000
            });
        }

    })

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
    height: 950px;
    background-color: #f3f4f8;
    /* border: 1px solid #333; */
    /* 边框样式 */
    box-shadow:
        inset -1em -1em 3em rgba(200, 204, 200, 0.3),
        0 0 0 2px white,
        0.3em 0.3em 1em rgba(92, 91, 91, 0.6);
    border-radius: 10px;
    overflow: hidden;
}

.select {
    width: 90%;
    height: 165px;
    margin: 0px auto;
}

.select-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.el-input {
    width: 200px;
}

.float {
    width: 100%;
    height: 50px;
}

.float:nth-child(1) {
    margin-top: 20px;
}

.float .el-form-item {
    float: left;
}

.float2 {
    width: 100%;
    height: 50px;
}

.float2 .el-form-item {
    float: left;
    margin-right: 20px;
}

.button {
    width: 200px;
    height: 50px;
    float: right;
}

.table {
    width: 90%;
    height: 800px;
    margin: 0px auto;
}

.table-content {
    width: 100%;
    height: 720px;
}

.page-content {
    width: 100%;
    height: 50px;
    overflow: hidden;
}

.demo-pagination-block {
    width: 600px;
    height: 40px;
    margin: 0px auto;
    margin-top: 15px;
}

.margin-right {
    margin-right: 20px;
}

a {
    text-decoration: none;
    color: rgb(71, 77, 77);
}
</style>