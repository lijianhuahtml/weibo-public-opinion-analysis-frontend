<template>
    <el-main>
        <div class="main">
            <div class="content">
                <div class="hot">
                    <el-table :data="cloudWord" height="900" border highlight-current-row stripe style="width: 100%"
                        align="center" :resizable="false">
                        <el-table-column type="index" label="序号" width="100" align="center" />
                        <el-table-column prop="word" label="词云" width="200" align="center" :resizable="false" />

                        <el-table-column prop="num" label="数量" width="200" align="center" :resizable="false" />
                        <el-table-column prop="time" label="时间" width="150" align="center" :resizable="false">
                            <template #default="{ row }">
                                {{ extractYearAndMonthAndDay(row.time, timeZone) }}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="150" align="center" :resizable="false">
                                <template #default="{ row }">
                                    <el-button type="danger" size="small" @click="npush(row.id)">取消</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                </div>
                <div class="set">
                    <div class="select">
                        <el-date-picker v-model="form.time" type="date" placeholder="Pick a date"
                            style="float: left; width: 200px; margin-top: 10px;" />
                        <el-button type="primary" style="float: left; margin-top: 10px;" @click="getHotWord">查询</el-button>
                    </div>
                    <div class="table">
                        <el-table :data="cloudWordList" height="820" border highlight-current-row stripe style="width: 100%"
                            align="center">
                            <el-table-column type="index" label="序号" width="100" align="center" :resizable="false" />
                            <el-table-column prop="word" label="词云" width="200" align="center" :resizable="false" />
                            <el-table-column prop="num" label="数量" width="200" align="center" :resizable="false" />
                            <el-table-column label="操作" width="200px" align="center" :resizable="false">
                                <template #default="{ row }">
                                    <el-button type="success" size="small" @click="push(row.id)">上传</el-button>
                                    <el-button type="primary" size="small" @click="edit(row)">编辑</el-button>
                                    <el-button type="danger" size="small" @click="remove(row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="edit">
                <el-dialog v-model="dialogVisible" title="词云信息" width="30%">
                    <el-form class="hotword" label-width="100px">
                        <el-form-item label="词云">
                            <el-input v-model="cloudWordInfo.word" :disabled=!isEdit />
                        </el-form-item>
                        <el-form-item label="数量">
                            <el-input v-model="cloudWordInfo.num" :disabled=!isEdit />
                        </el-form-item>
                        <el-form-item>
                            <el-button v-if="!isEdit" type="primary" @click="editing">修改</el-button>
                            <el-button v-if="isEdit" type="primary" @click="update">提交</el-button>
                            <el-button @click="dialogVisible = false">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </div>
        </div>
    </el-main>
</template>
  
<script setup>
import { reactive, ref } from 'vue';
import api from '../../../api';
import { ElNotification } from 'element-plus'
import { extractYearAndMonthAndDay } from "../../../utils/date";
// 使用 onMounted 钩子确保在组件挂载后执行代码

const form = reactive({
    time: '',
    title: ''
});

const cloudWordInfo = reactive({
    id: '',
    word: '',
    num: '',
})

const timeZone = ref();

const cloudWord = reactive([]);
const cloudWordList = reactive([]);

const dialogVisible = ref(false);

const isEdit = ref(false);

load();

function load() {
    api.postCloudWordTable().then(Response => {
            if (true === Response.data.data.isGet) {
                cloudWord.length = 0;
                timeZone.value = Response.data.data.TimeZone;
                Response.data.data.cloudWordList.forEach((value) => {
                    cloudWord.push(value);
                });
            } else {
                cloudWord.length = 0;
                cloudWordList.length = 0;
            }
        })
}

function edit(r) {
    isEdit.value = false;
    cloudWordInfo.id = r.id;
    cloudWordInfo.word = r.word;
    cloudWordInfo.num = r.num;

    dialogVisible.value = true;
}

function editing() {
    isEdit.value = true;
}

function getHotWord() {
    if (form.time == null) {
        form.time = '';
    }
        api.postCloudWordList(form.time.toString()).then(Response => {
            if (true === Response.data.data.isGet) {
                cloudWordList.length = 0;
                timeZone.value = Response.data.data.TimeZone;
                Response.data.data.cloudWordList.forEach((value) => {
                    if (value.type == 0) {
                        cloudWordList.push(value);
                    }
                });
                
            load();
            } else {
                cloudWordList.length = 0;
            }
        })
}

function push(id) {
    if (form.time == null) {
        form.time = '';
    }
    api.postUpdateCloudWordType(id,1, form.time.toString()).then(Response => {
        if (true === Response.data.data.isUpdate) {
            cloudWord.length = 0;
            cloudWordList.length = 0;
            Response.data.data.cloudWordList.forEach((value) => {
                if (value.type == 0) {
                    cloudWordList.push(value);
                }
            });
            load();
        } else {
            cloudWord.length = 0;
            cloudWordList.length = 0;
        }

    })
}

function npush(id) {
    if (form.time == null) {
        form.time = '';
    }
    api.postUpdateCloudWordType(id, 0,form.time.toString()).then(Response => {
        if (true === Response.data.data.isUpdate) {
            cloudWord.length = 0;
            cloudWordList.length = 0;
            Response.data.data.cloudWordList.forEach((value) => {
                if (value.type == 0) {
                    cloudWordList.push(value);
                }
            });
            load();
        } else {
            cloudWord.length = 0;
            cloudWordList.length = 0;
        }

    })
    
}

function update() {
    api.postUpdateCloudWord(cloudWordInfo.id, cloudWordInfo.word, cloudWordInfo.num).then(Response => {
        if (Response.data.data.isUpdate) {
            cloudWord.length = 0;
            cloudWordList.length = 0;
            Response.data.data.cloudWordList.forEach((value) => {
                if (value.type == 0) {
                    cloudWordList.push(value);
                }
                
            });

            ElNotification({
                message: '修改成功',
                type: 'success',
                position: 'bottom-left',
                duration: 3000
            });

            dialogVisible.value = false;

            load();

        } else {
            cloudWord.length = 0;
            cloudWordList.length = 0;
            ElNotification({
                message: "修改失败",
                type: 'error',
                position: 'bottom-left',
                duration: 3000
            });
        }
    })
}

function remove(row) {
    api.postDeleteCloudWord(row.id).then(Response => {
        if (Response.data.data.isDelete) {
            cloudWordList.length = 0;
            Response.data.data.cloudWordList.forEach((value) => {
                if (value.type == 0) {
                    cloudWordList.push(value);
                }
            });

            ElNotification({
                message: '删除成功',
                type: 'success',
                position: 'bottom-left',
                duration: 3000
            });

        } else {
            cloudWord.length = 0;
            cloudWordList.length = 0;
            ElNotification({
                message: "删除失败",
                type: 'error',
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
    box-shadow:
        inset -1em -1em 3em rgba(200, 204, 200, 0.3),
        0 0 0 2px white,
        0.3em 0.3em 1em rgba(92, 91, 91, 0.6);
    border-radius: 10px;
    overflow: hidden;
}

.hot {
    float: left;
    width: 800px;
    height: 900px;
    margin-top: 20px;
    margin-left: 20px;
}

.set {
    float: left;
    width: 700px;
    height: 900px;
    margin-top: 20px;
    margin-left: 20px;
}

.hotword {
    width: 350px;
    margin: 0 auto;
}

.select {
    width: 400px;
    height: 60px;
}

.table {
    width: 100%;
    height: 800px;
    margin-top: 20px;
}

.content {
    width: 100%;
    height: 1150px;
    margin: 0 auto;
}
</style>
  