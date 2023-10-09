import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/layouts/cover/index.vue'),
            children: [
                {
                    path: '/',
                    component: () => import('@/views/login/index.vue')
                },
                {
                    path: '/register',
                    component: () => import('@/views/register/index.vue')
                },
                {
                    path: '/forget',
                    component: () => import('@/views/forget/index.vue')
                }
            ]
        },
        {
            path: '/main',
            component: () => import('@/layouts/main/index.vue'),
            children: [
                {
                    path: '/market',
                    component: () => import('@/views/market/index.vue')
                },
                {
                    path: '/stock',
                    component: () => import('@/views/stock/index.vue')
                },
                {
                    path: '/contract',
                    component: () => import('@/views/contract/index.vue')
                },
                {
                    path: '/contract',
                    component: () => import('@/views/contract/index.vue')
                },
                {
                    path: '/account',
                    component: () => import('@/views/account/index.vue')
                },
                {
                    path: '/information',
                    component: () => import('@/views/information/index.vue')
                }
            ]
        }
    ]
})
