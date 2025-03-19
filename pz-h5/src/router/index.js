import { createWebHashHistory, createRouter } from 'vue-router'

import Layout from '../pages/Main.vue'
import Home from '../pages/home/index.vue'
import Order from '../pages/order/index.vue'
import User from '../pages/user/index.vue'
import Login from '../pages/login/index.vue'
import createOrder from '../pages/createOrder/index.vue'
import detail from '../pages/detail/index.vue'

const routes = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                meta: {
                    icon: 'home-o',
                    name: '首页'
                },
                component: Home
            },
            {
                path: 'order',
                meta: {
                    icon: 'orders-o',
                    name: '订单'
                },
                component: Order
            },
            {
                path: 'user',
                meta: {
                    icon: 'user-circle-o',
                    name: '我的'
                },
                component: User
            }
        ]
    },
    {
        path: '/login',
        name: "login",
        component: Login

    },
    {
        path: '/createOrder',
        name: "createOrder",
        component: createOrder
    },
    {
        path: '/detail',
        name: "detail",
        component: detail
    },
]

 const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from) => {
    const token = localStorage.getItem('h5_token')
    //非登录页面token不存在     ======    没有注册保存过的账号和密码进入了后台，跳回登录页面
    if (!token && to.path !== '/login'){
        return '/login'
    } else if(token && to.path === '/login'){  //token存在，但是进入登录页面，跳回后台首页
        return '/'
    }
})

export default router