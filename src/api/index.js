import axios from "../utils/request"
import path from "./path"

const api = {
    postLogin(username, password) {
        return axios.post(path.baseUrl + path.user + path.login, {
            username: username,
            password: password
        })
    },

    postRegister(username, password, email) {
        return axios.post(path.baseUrl + path.email + path.code, {
            username: username,
            email: email,
            password: password
        })
    },

    postUploadImage(formData, id) {
        return axios.post(path.baseUrl + path.user + path.uploadImage, formData, {
            params: { id: id }
        })
    },

    postUploadCarousel(formData) {
        return axios.post(path.baseUrl + path.image + path.uploadCarousel, formData, {})
    },

    postUpdateUserInfo(id, username, email, phone) {
        return axios.post(path.baseUrl + path.user + path.updateUserInfo, {
            id: id,
            username: username,
            email: email,
            phone: phone
        })
    },

    postUpatePassword(id, oldPassword, newPassword) {
        return axios.post(path.baseUrl + path.user + path.updatePassword, {
            id: id,
            oldPassword: oldPassword,
            newPassword: newPassword
        })
    },

    postResetPassword(id, password) {
        return axios.post(path.baseUrl + path.user + path.resetPassword, {
            id: id,
            password: password,
        })
    },

    postGetNoticeList(pager, size) {
        return axios.post(path.baseUrl + path.notice + path.noticeList, {
            pager: pager,
            size: size
        })
    },

    postGetNotice(id) {
        return axios.post(path.baseUrl + path.notice + path.noticeOne, {
            id: id
        })
    },

    getGetCarousel() {
        return axios.get(path.baseUrl + path.image + path.carousel, {})
    },

    postCommentList(pager, size, keyWord, area, source, sort, emotion, timeType, startTime, endTime, day, time) {
        return axios.post(path.baseUrl + path.comment + path.getCommentList, {
            pager: pager,
            size: size,
            keyWord: keyWord,
            area: area,
            source: source,
            sort: sort,
            emotion: emotion,
            timeType: timeType,
            startTime: startTime,
            endTime: endTime,
            day: day,
            time: time
        })
    },

    postCollectCommentList(pager, size, uId, keyWord, area, source, sort, emotion, timeType, startTime, endTime, day, time) {
        return axios.post(path.baseUrl + path.user + path.collectCommentList, {
            pager: pager,
            size: size,
            uId: uId,
            keyWord: keyWord,
            area: area,
            source: source,
            sort: sort,
            emotion: emotion,
            timeType: timeType,
            startTime: startTime,
            endTime: endTime,
            day: day,
            time: time
        })
    },

    postCollectComment(uId, comId) {
        return axios.post(path.baseUrl + path.user + path.collectComment, {
            uId: uId,
            comId: comId
        })
    },

    postCancelCollect(uId, comId) {
        return axios.post(path.baseUrl + path.user + path.cancelCollect, {
            uId: uId,
            comId: comId
        })
    },

    postHotWord(time) {
        return axios.post(path.baseUrl + path.hotWord + path.hotWord1, {
            time: time
        })
    },

    postCloudWord() {
        return axios.post(path.baseUrl + path.cloudWord + path.cloudWord_, {})
    },


    postHotWordList(time) {
        return axios.post(path.baseUrl + path.hotWord + path.hotWordList, {
            time: time
        })
    },

    postCloudWordList(time) {
        return axios.post(path.baseUrl + path.cloudWord + path.cloudWordList, {
            time: time
        })
    },

    postCloudWordTable() {
        return axios.post(path.baseUrl + path.cloudWord + path.cloudWordTable, {})
    },

    postUpdateCloudWordType(id, type, time) {
        return axios.post(path.baseUrl + path.cloudWord + path.updateType, {
            id: id,
            type: type,
            time: time,
        })
    },

    postUpdateCloudWord(id, word, num) {
        return axios.post(path.baseUrl + path.cloudWord + path.updateHotWord, {
            id: id,
            word: word,
            num: num
        })
    },

    postDeleteCloudWord(id) {
        return axios.post(path.baseUrl + path.cloudWord + path.deleteHotWord, {
            id: id
        })
    },


    postUpdateHotWordType(id) {
        return axios.post(path.baseUrl + path.hotWord + path.updateType, {
            id: id
        })
    },

    postUpdateHotWord(id, word, num) {
        return axios.post(path.baseUrl + path.hotWord + path.updateHotWord, {
            id: id,
            word: word,
            num: num
        })
    },

    postDeleteHotWord(id) {
        return axios.post(path.baseUrl + path.hotWord + path.deleteHotWord, {
            id: id
        })
    },

    getWeekCommentAreaNum() {
        return axios.get(path.baseUrl + path.comment + path.weekCommentAreaNum, {})
    },

    getLastTwoWeekPositiveNum() {
        return axios.get(path.baseUrl + path.comment + path.lastTwoWeekPositiveNum, {})
    },

    getlastTwoWeekNegativeNum() {
        return axios.get(path.baseUrl + path.comment + path.lastTwoWeekNegativeNum, {})
    },

    postEarlyWarnCommentList(pager, size, keyWord, area, source, sort, type, timeType, startTime, endTime, day, time) {
        return axios.post(path.baseUrl + path.comment + path.earlyWarnComment, {
            pager: pager,
            size: size,
            keyWord: keyWord,
            area: area,
            source: source,
            sort: sort,
            type: type,
            timeType: timeType,
            startTime: startTime,
            endTime: endTime,
            day: day,
            time: time
        })
    },

    postPublishNotice(userId, title, content) {
        return axios.post(path.baseUrl + path.notice + path.publishNotice, {
            userId: userId,
            title: title,
            content: content
        })
    },

    postDeleteNotice(noticeId) {
        return axios.post(path.baseUrl + path.notice + path.deleteNotice, {
            noticeId: noticeId,
        })
    },

    postUpdateNotice(noticeId, userId, title, content) {
        return axios.post(path.baseUrl + path.notice + path.updateNotice, {
            noticeId: noticeId,
            userId: userId,
            title: title,
            content: content
        })
    },

    postDeleteComment(commentId) {
        return axios.post(path.baseUrl + path.comment + path.deleteComment, {
            commentId: commentId
        })
    },

    postGetUserList(pager, size, id, name, type) {
        return axios.post(path.baseUrl + path.user + path.userList, {
            pager: pager,
            size: size,
            id: id,
            name: name,
            type: type
        })
    },

    postUpdateUser(id, name, type, email, phone) {
        return axios.post(path.baseUrl + path.user + path.updateUser, {
            id: id,
            name: name,
            type: type,
            email: email,
            phone: phone,
        })
    },

    postDeleteUser(id) {
        return axios.post(path.baseUrl + path.user + path.deleteUser, {
            id: id
        })
    },

    getManagerAddUser() {
        return axios.get(path.baseUrl + path.user + path.managerAddUser, {})
    },

    postEarlyWarning(commentId) {
        return axios.post(path.baseUrl + path.comment + path.earlyWarning, {
            commentId: commentId
        })
    },

    postResetEarlyWarning(commentId, type) {
        return axios.post(path.baseUrl + path.comment + path.resrt, {
            commentId: commentId,
            type: type,
        })
    },

    postCancelEarlyWarning(commentId) {
        return axios.post(path.baseUrl + path.comment + path.cancelEarlyWarning, {
            commentId: commentId
        })
    },

    postHotTimeType(type) {
        return axios.post(path.baseUrl + path.hotWord + path.hotWordTypeTime, {
            type: type
        })
    },

    postExcel(formData) {
        return axios.post(path.baseUrl + path.user + path.uploadExcel, formData, {})
    },

}

export default api;