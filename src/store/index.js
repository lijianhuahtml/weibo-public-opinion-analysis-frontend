import {
    createStore
} from 'vuex'
import axios from '../utils/request.js'


// vuex的核心作用就是帮我们管理组件之间的状态的
const store = createStore({
    //所有状态都存放在这里（数据）
    state: {
        user: {
            id: localStorage.getItem('userId') || '',
            headImage: localStorage.getItem('headImage') || 'https://img0.baidu.com/it/u=3232582821,3516640051&fm=253&fmt=auto&app=138&f=JPEG?w=625&h=500',
            name: localStorage.getItem('userName') || '',
            email: localStorage.getItem('email') || '',
            phone: localStorage.getItem('phone') || '',
            level: localStorage.getItem('level') || 0,
        },
        notice: {
            id: localStorage.getItem('noticeId') || '',
            title: localStorage.getItem('noticeTitle') || '',
            content: localStorage.getItem('noticeContent') || '',
            time: localStorage.getItem('noticeTime') || ''
        },
        timeZone: localStorage.getItem('timeZone') || '',
        userToken: localStorage.getItem('userToken') || '',
        isDeleteNotice: localStorage.getItem('userToken') || ''
    },
    mutations: {
        setUserId(state, id) {
            state.user.id = id;
            localStorage.setItem('userId', id);
        },
        setUserImage(state, image) {
            state.user.headImage = image;
            localStorage.setItem('headImage', image);
        },
        setUsername(state, username) {
            state.user.name = username;
            localStorage.setItem('userName', username);
        },
        setEmail(state, email) {
            state.user.email = email;
            localStorage.setItem('email', email);
        },
        setPhone(state, phone) {
            state.user.phone = phone;
            localStorage.setItem('phone', phone);
        },
        setLevel(state, level) {
            state.user.level = level;
            localStorage.setItem('level', level);
        },
        setNoticeId(state, id) {
            state.notice.id = id;
            localStorage.setItem('noticeId', id);
        },
        setNoticeTitle(state, title) {
            state.notice.title = title;
            localStorage.setItem('noticeTitle', title);
        },
        setNoticeContent(state, content) {
            state.notice.content = content;
            localStorage.setItem('noticeContent', content);
        },
        setNoticeTime(state, time) {
            state.notice.time = time;
            localStorage.setItem('noticeTime', time);
        },
        setTimeZone(state, timeZone) {
            state.timeZone = timeZone;
            localStorage.setItem('timeZone', timeZone);
        },
        setUserToken(state, token) {
            state.userToken = token;
            if (token) {
                localStorage.setItem('userToken', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                localStorage.removeItem('userToken');
                delete axios.defaults.headers.common['Authorization'];
            }
        },
        setIsDeleteNotice(state, isDeleteNotice) {
            state.isDeleteNotice = isDeleteNotice;
            localStorage.setItem('isDeleteNotice', isDeleteNotice);
        }
    },
    actions: {

    }
})

export default store;