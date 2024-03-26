<template>
    <el-main>
        <div class="main">
            <div class="content">
                <div class="hot">
                    <el-table :data="hotWord" height="900" border highlight-current-row stripe style="width: 100%"
                        align="center" :resizable="false">
                        <el-table-column type="index" label="序号" width="100" align="center" />
                        <el-table-column prop="word" label="热词" width="200" align="center" :resizable="false" />

                        <el-table-column prop="num" label="数量" width="200" align="center" :resizable="false" />
                    </el-table>
                </div>
                <div class="set">
                    <div class="select">
                        <el-date-picker v-model="form.time" type="date" placeholder="Pick a date"
                            style="float: left; width: 200px; margin-top: 10px;" />
                        <el-button type="primary" style="float: left; margin-top: 10px;" @click="getHotWord">查询</el-button>
                    </div>
                    <div class="table">
                        <el-table :data="hotWordList" height="820" border highlight-current-row stripe style="width: 100%"
                            align="center">
                            <el-table-column type="index" label="序号" width="100" align="center" :resizable="false" />
                            <el-table-column prop="word" label="热词" width="200" align="center" :resizable="false" />
                            <el-table-column prop="num" label="数量" width="200" align="center" :resizable="false" />
                            <el-table-column label="操作" width="200px" align="center" :resizable="false">
                                <template #default="{ row }">
                                    <el-button type="success" size="small" v-if="row.type == 0"
                                        @click="push(row.id)">上传</el-button>
                                    <el-button type="info" size="small" v-if="row.type == 1"
                                        @click="push(row.id)">取消</el-button>
                                    <el-button type="primary" size="small" @click="edit(row)">编辑</el-button>
                                    <el-button type="danger" size="small" @click="remove(row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="edit">
                <el-dialog v-model="dialogVisible" title="热词信息" width="30%">
                    <el-form class="hotword" label-width="100px">
                        <el-form-item label="热词">
                            <el-input v-model="hotWordInfo.word" :disabled=!isEdit />
                        </el-form-item>
                        <el-form-item label="数量">
                            <el-input v-model="hotWordInfo.num" :disabled=!isEdit />
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

// 使用 onMounted 钩子确保在组件挂载后执行代码

const form = reactive({
    time: null,
    title: ''
});

const hotWordInfo = reactive({
    id: '',
    word: '',
    num: '',
})

const hotWord = reactive([]);
const hotWordList = reactive([]);

const dialogVisible = ref(false);

const isEdit = ref(false);

function edit(r) {
    isEdit.value = false;
    hotWordInfo.id = r.id;
    hotWordInfo.word = r.word;
    hotWordInfo.num = r.num;

    dialogVisible.value = true;
}

function editing() {
    isEdit.value = true;
}

function getHotWord() {

    const endTime = ref('');

    if (null != form.time && '' !== form.time) {
        endTime.value = form.time.toString();


        api.postHotWordList(endTime.value).then(Response => {
            if (true === Response.data.data.isGet) {
                hotWord.length = 0;
                hotWordList.length = 0;
                Response.data.data.hotWordList.forEach((value) => {
                    if (value.type == 1) {
                        hotWord.push(value);
                    }
                    hotWordList.push(value);
                });
            } else {
                hotWord.length = 0;
                hotWordList.length = 0;
            }

        })
    }
}

function push(id) {
    api.postUpdateHotWordType(id).then(Response => {
        if (true === Response.data.data.isUpdate) {
            hotWord.length = 0;
            hotWordList.length = 0;
            Response.data.data.hotWordList.forEach((value) => {
                if (value.type == 1) {
                    hotWord.push(value);
                }
                hotWordList.push(value);
            });
        } else {
            hotWord.length = 0;
            hotWordList.length = 0;
        }

    })
}

function update() {
    api.postUpdateHotWord(hotWordInfo.id, hotWordInfo.word, hotWordInfo.num).then(Response => {
        if (Response.data.data.isUpdate) {
            hotWord.length = 0;
            hotWordList.length = 0;
            Response.data.data.hotWordList.forEach((value) => {
                if (value.type == 1) {
                    hotWord.push(value);
                }
                hotWordList.push(value);
            });

            ElNotification({
                message: '修改成功',
                type: 'success',
                position: 'bottom-left',
                duration: 3000
            });

            dialogVisible.value = false;

        } else {
            hotWord.length = 0;
            hotWordList.length = 0;
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
    api.postDeleteHotWord(row.id).then(Response => {
        if (Response.data.data.isDelete) {
            hotWord.length = 0;
            hotWordList.length = 0;
            Response.data.data.hotWordList.forEach((value) => {
                if (value.type == 1) {
                    hotWord.push(value);
                }
                hotWordList.push(value);
            });

            ElNotification({
                message: '删除成功',
                type: 'success',
                position: 'bottom-left',
                duration: 3000
            });

            dialogVisible.value = false;

        } else {
            hotWord.length = 0;
            hotWordList.length = 0;
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
    width: 500px;
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
    width: 1300px;
    height: 950px;
    margin: 0 auto;
}
</style>
  