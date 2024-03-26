<template>
    <el-main>
        <div class="main">
            <div class="select">
                <div class="select-content">
                    <el-form :model="form" label-width="80px">
                        <div class="float">
                            <el-form-item label="用户ID" style="font-size;: 50px">
                                <el-input v-model="form.id" />
                            </el-form-item>
                            <el-form-item label="用户名称">
                                <el-input v-model="form.name" />
                            </el-form-item>
                            <el-form-item label="用户类型" width="200px">
                                <el-select v-model="form.type" placeholder="" style="width: 200px">
                                    <el-option label="" value="" />
                                    <el-option label="用户" value="0" />
                                    <el-option label="管理员" value="1" />
                                </el-select>
                            </el-form-item>
                            <div class="button">
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                                <el-button type="primary" @click="addUser">新增</el-button>
                                <el-button @click="resetForm(form)">重置</el-button>
                            </div>
                            <div>
                                <el-upload v-model:file-list="fileList" ref="upload" accept='.xlsx' class="upload-demo" action="http://localhost:8080/user/uploadExcel" :limit="1" :on-exceed="handleExceed"
                                :on-change="handleFileChange" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">选择文件</el-button>
                                    </template>
                                    <el-button class="ml-3" type="success" @click="submitUpload" style="margin-left: 20px;">上传文件</el-button>
                                    <!-- <el-button class="ml-3" type="info" @click="submitUpload" >导出用户</el-button> -->
                                    <template #tip>
                                      <div class="el-upload__tip text-red">
                                        每次只能上传一份excel文件,新文件会覆盖之前的
                                      </div>
                                    </template>
                                </el-upload>

                            </div>
                            
                        </div>
                    </el-form>
                </div>
            </div>
            <div class="table">
                <div class="table-content">
                    <el-table :data="tableData" height="750" border highlight-current-row stripe style="width: 100%"
                        align="center">
                        <el-table-column type="index" label="序号" :index="(page.currentPage - 1) * page.pageSize + 1"
                            width="120" align="center" />
                        <el-table-column prop="id" label="用户ID" width="148px" align="center" :resizable="false" />

                        <el-table-column prop="name" label="用户名称" width="252px" align="center" :resizable="false" />

                        <el-table-column prop="level" label="用户类型" width="100px" align="center" :resizable="false">
                            <template #default="{ row }">
                                <el-tag :type="row.level === 0 ? 'success' : 'danger'" disable-transitions>{{
                                    row.level === 0 ? '用户' : '管理员' }}</el-tag>
                            </template>
                        </el-table-column>

                        <el-table-column prop="email" label="电子邮箱" width="200px" align="center" :resizable="false" />

                        <el-table-column prop="phone" label="手机号码" width="180px" align="center" :resizable="false" />

                        <el-table-column prop="createTime" label="创建时间" width="168px" align="center" :resizable="false">
                            <template #default="{ row }">
                                {{ extractDate(row.createTime, timeZone) }}
                            </template>
                        </el-table-column>

                        <el-table-column label="操作" width="250px" align="center" :resizable="false">
                            <template #default="{ row }">
                                <el-button type="primary" size="small" @click="edit(row)">编辑</el-button>
                                <el-button type="info" size="small" @click="resetPassword(row)">重置密码</el-button>
                                <el-button type="danger" size="small" @click="remove(row.id)">删除</el-button>
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
            <div class="edit" v-if="editVisible">
                <el-dialog v-model="editVisible" title="用户信息" width="30%">
                    <el-form class="user" label-width="100px">
                        <el-form-item label="用户ID">
                            <el-input v-model="user.id" :disabled=true />
                        </el-form-item>
                        <el-form-item label="用户名称">
                            <el-input v-model="user.name" :disabled=!isEdit />
                        </el-form-item>
                        <el-form-item label="用户类型">
                            <el-select v-model="user.type" placeholder="" style="width: 200px" :disabled="!isEdit">
                                <el-option label="用户" value="0" />
                                <el-option label="管理员" value="1" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="电子邮箱">
                            <el-input v-model="user.email" :disabled=!isEdit />
                        </el-form-item>
                        <el-form-item label="手机号码">
                            <el-input v-model="user.phone" :disabled=!isEdit />
                        </el-form-item>
                        <el-form-item>
                            <el-button v-if="!isEdit" type="primary" @click="isEdit = true;">修改</el-button>
                            <el-button v-if="isEdit" type="primary" @click="push">提交</el-button>
                            <el-button @click="editVisible = false">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </div>

            <div class="password" v-if="passwordVisible">
                <el-dialog v-model="passwordVisible" title="重置密码" width="30%">
                    <el-form class="user" label-width="100px">
                        <el-form-item label="新密码">
                            <el-input type="password" v-model="form_password.newPassword1" :disabled=!isPassword />
                        </el-form-item>
                        <el-form-item label="确认密码">
                            <el-input type="password" v-model="form_password.newPassword2" :disabled=!isPassword />
                        </el-form-item>
                        <el-form-item>
                            <el-button v-if="!isPassword" type="primary" @click="isPassword = true;">修改</el-button>
                            <el-button v-if="isPassword" type="primary" @click="pushReset">提交</el-button>
                            <el-button @click="passwordVisible = false">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
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
import { isValidPhoneNumber, isValidUsername, isValidPassword, isValidEmail } from '../../../utils/check.js';


const store = useStore();

const page = reactive({
    currentPage: 1,
    pageSize: 50,
    total: 0,
});

const upload = ref(null)

const fileList = ref([]);

function handleFileChange(file, fileList_) {
    fileList.value = fileList_
}

const handleExceed = () => {
    ElNotification({
        message: '只能上传1份excel',
        type: 'error',
        position: 'bottom-left',
        duration: 3000
    });
}

const submitUpload = () => {
    const formData = new FormData();

    if (fileList.value.length == 0) {
        ElNotification({
        message: '没有选择文件',
        type: 'error',
        position: 'bottom-left',
        duration: 3000
    });
    } else {
        fileList.value.forEach((file) => {
            formData.append("excel", file.raw);
        });

        api.postExcel(formData).then(Response => {
            if (true === Response.data.data.isImport) {
                ElNotification({
                    message: '导入成功',
                    type: 'success',
                    position: 'bottom-left',
                    duration: 3000
                })
                fileList.value = [];
                queryUser(1, page.pageSize);
            } else {
                ElNotification({
                    message:  Response.data.data.message,
                    type: 'error',
                    position: 'bottom-left',
                    duration: 3000
                })
            }
        });
    }

    
}

const timeZone = ref();

const editVisible = ref(false);
const passwordVisible = ref(false);

const isEdit = ref(false);
const isPassword = ref(false);

// do not use same name with ref
const form = reactive({
    id: '',
    name: '',
    type: '',
});

const user = reactive({
    id: '',
    name: '',
    type: '',
    email: '',
    phone: '',
})

const form_password = reactive({
    id: '',
    newPassword1: '',
    newPassword2: '',
})

const tableData = reactive([]);

const onSubmit = () => {
    queryUser(1, page.pageSize);
}

const handleCurrentChange = (val) => {
    page.currentPage = val;
    queryUser(val, page.pageSize);
}

load();

function load() {
    queryUser(1, page.pageSize);
}

function queryUser(pager, size) {

    api.postGetUserList(pager, size, form.id, form.name, form.type).then(Response => {
        if (true === Response.data.data.isGet) {
            tableData.length = 0;
            timeZone.value = Response.data.data.TimeZone;
            page.total = Response.data.data.total;
            Response.data.data.userList.forEach((value) => {
                tableData.push(value);
            });
        } else {
            tableData.length = 0;
        }

    })
}

function resetForm() {
    form.id = '';
    form.name = '';
    form.type = '';
}

function edit(r) {
    isEdit.value = false;
    user.id = r.id;
    user.name = r.name;
    if (r.level === 0) {
        user.type = '用户';
    } else {
        user.type = '管理员';
    }
    user.email = r.email;
    user.phone = r.phone;
    user.password = r.password;

    editVisible.value = true;
}

function resetPassword(r) {
    isPassword.value = false;
    form_password.id = r.id;
    form_password.newPassword1 = '';
    form_password.newPassword2 = '';

    passwordVisible.value = true;
}

function push() {
    if (('' === user.name || user.name == undefined) || ('' === user.password || user.password == undefined) || ('' === user.email || user.email == undefined)) {
        ElNotification({
            message: '信息不完全',
            type: 'error',
            position: 'bottom-left',
            duration: 3000
        });
    }else if ("" != user.phone && !isValidPhoneNumber(user.phone)) {
        ElNotification({
            message: '手机号格式不对',
            type: 'error',
            position: 'bottom-left',
            duration: 3000
        });
    } else if (!isValidUsername(user.name)) {
        ElNotification({
            message: '用户名在10个字符以内，不为空',
            type: 'error',
            position: 'bottom-left',
            duration: 3000
        });
    } else if (!isValidEmail(user.email)) {
        ElNotification({
            message: '电子邮箱格式不对，不为空',
            type: 'error',
            position: 'bottom-left',
            duration: 3000
        });
    } else {
        api.postUpdateUser(user.id, user.name, user.type == '0' ? 0 : 1, user.email, user.phone).then(Response => {
            if (Response.data.data.isUpdate) {
                ElNotification({
                    message: '修改成功',
                    type: 'success',
                    position: 'bottom-left',
                    duration: 3000
                });

                if (store.state.user.id == user.id) {
                    store.commit('setUsername', user.name);
                }

                editVisible.value = false;

                queryUser(page.currentPage, page.pageSize);
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

function pushReset() {
    if (form_password.newPassword1 != form_password.newPassword2) {
        ElNotification({
            message: '密码不一致',
            type: 'error',
            position: 'bottom-left',
            duration: 3000
        });
    } else if (!isValidPassword(form_password.newPassword2)) {
        ElNotification({
            message: '密码长度6-16位字符,包含数字与字母，不为空',
            type: 'error',
            position: 'bottom-left',
            duration: 3000
        });
    } else {
        api.postResetPassword(form_password.id, form_password.newPassword1).then(Response => {
            if (Response.data.data.isUpdate) {
                ElNotification({
                    message: '修改成功',
                    type: 'success',
                    position: 'bottom-left',
                    duration: 3000
                });

                editVisible.value = false;

                queryUser(page.currentPage, page.pageSize);
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

function remove(userId) {
    api.postDeleteUser(userId).then(Response => {
        if (true === Response.data.data.isDelete) {
            ElNotification({
                message: '删除成功',
                type: 'success',
                position: 'bottom-left',
                duration: 3000
            });

            queryUser(page.currentPage, page.pageSize);
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

function addUser() {
    api.getManagerAddUser().then(Response => {
        if (true === Response.data.data.isAdd) {
            ElNotification({
                message: '新增成功',
                type: 'success',
                position: 'bottom-left',
                duration: 3000
            });

            queryUser(1, page.pageSize);
        } else {
            ElNotification({
                message: '新增失败',
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
    /* border: 1px solid #333; */
    /* 边框样式 */
    box-shadow:
        inset -1em -1em 3em rgba(200, 204, 200, 0.3),
        0 0 0 2px white,
        0.3em 0.3em 1em rgba(92, 91, 91, 0.6);
    border-radius: 10px;
    overflow: hidden;
}

.user {
    width: 350px;
    margin: 0 auto;
}

.select {
    width: 90%;
    height: 80px;
    margin: 20px auto;
}

.select-content {
    width: 100%;
    height: 100%;
    /* overflow: hidden; */
    /* background: yellowgreen; */
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

.button {
    width: 250px;
    height: 50px;
    float: left;
}

.table {
    width: 90%;
    height: 800px;
    margin: 0px auto;
    margin-top: 30px;
}

.table-content {
    width: 100%;
    height: 750px;
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
</style>