import { createRouter, createWebHashHistory } from "vue-router"
import UserIndexView from '../views/UserIndexView.vue'
import store from "@/store"

//配置信息中需要的页面的相关消息

const routes = [
    {
        path: "",
        component: () => import('../views/LoginView.vue')
    },
    {
        path: "/user",
        component: UserIndexView,
        children: [
            {
                path: "",
                component: () => import('../components/user/home/HomeComponent.vue'),
            },
            {
                path: "noticeInform",
                component: () => import('../components/user/home/NoticeInformComponent.vue'),
            },
            {
                path: "userInfo",
                component: () => import('../components/user/head/UserInfoComponent.vue')
            },
            {
                path: "alterPassword",
                component: () => import('../components/user/head/AlterPasswordComponent.vue')
            },
            {
                path: "collect",
                component: () => import('../components/user/head/CollectComponent.vue')
            },
            {
                path: "query",
                component: () => import('../components/user/message/QueryCommentsComponent.vue')
            },
            {
                path: "autoEarlyWarn",
                component: () => import('../components/user/warning/AutoEarlyWarnComponent.vue')
            },
            {
                path: "ArtificialEarlyWarn",
                component: () => import('../components/user/warning/ArtificialEarlyWarnComponent.vue')
            },
        ]
    },
    {
        path: "/manager",
        component: () => import('../views/ManagerIndexView.vue'),
        children: [
            {
                path: "",
                component: () => import('../components/manager/home/HomeComponent.vue'),
            },
            {
                path: "noticeInform",
                component: () => import('../components/manager/home/NoticeInformComponent.vue'),
                children: [
                    {
                        path: "notice",
                        component: () => import('../components/manager/home/NoticeComponent.vue')
                    },
                ]
            },
            {
                path: "publishNoticeInform",
                component: () => import('../components/manager/home/PublishNoticeComponent.vue'),
                children: [
                    {
                        path: "",
                        component: () => import('../components/manager/home/PublishComponent.vue')
                    },
                    {
                        path: "edit",
                        component: () => import('../components/manager/home/PublishEditComponent.vue')
                    },
                ]
            },
            // {
            //     path: "setCarousel",
            //     component: () => import('../components/manager/home/SetCarouselComponent.vue')
            // },
            {
                path: "userInfo",
                component: () => import('../components/manager/head/UserInfoComponent.vue')
            },
            {
                path: "alterPassword",
                component: () => import('../components/manager/head/AlterPasswordComponent.vue')
            },
            {
                path: "collect",
                component: () => import('../components/manager/head/CollectComponent.vue')
            },
            {
                path: "query",
                component: () => import('../components/manager/message/QueryCommentsComponent.vue')
            },
            {
                path: "hotWord",
                component: () => import('../components/manager/analysis/HotWordAnalysisComponent.vue')
            },
            {
                path: "map",
                component: () => import('../components/manager/analysis/MapAnalysisComponent.vue')
            },
            {
                path: "hotManage",
                component: () => import('../components/manager/analysis/HotManageComponent.vue')
            },
            {
                path: "cloudManage",
                component: () => import('../components/manager/analysis/CloudWordManageComponent.vue')
            },
            {
                path: "emotion",
                component: () => import('../components/manager/analysis/EmotionAnalysisComponent.vue')
            },
            {
                path: "autoEarlyWarn",
                component: () => import('../components/manager/warning/AutoEarlyWarnComponent.vue')
            },
            {
                path: "artificialEarlyWarn",
                component: () => import('../components/manager/warning/ArtificialEarlyWarnComponent.vue')
            },
            {
                path: "userManager",
                component: () => import('../components/manager/user/UserManagerComponent.vue')
            },
        ]
    },
    {
        path: "/login",
        component: () => import('../views/LoginView.vue')
    },
    {
        path: "/register",
        component: () => import('../views/RegisterView.vue')
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})


router.beforeEach((to, from, next) => {

    if (to.path === '/register') {
        return next();
    } else if (store.state.user.level == 0 && to.path.startsWith('/user')) {
        return next();
    } else if (store.state.user.level == 1 && to.path.startsWith('/manager')) {
        return next();
    } else if (to.path === '/login') {
        // 如果已经是登录页，直接继续导航，避免无限循环
        return next();
    } else {
        return next('/login');
    }
})

export default router;



