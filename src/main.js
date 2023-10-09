import { createApp, defineAsyncComponent } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
import { axiosInterceptors, onFetchErr, createSocket } from 'frontend_common/fetch'
import { useSiteConfig } from 'frontend_common/hooks'
import { useUserInfoStore } from 'frontend_common/store'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import router from '@/router'
import CustomComponents from '@/components/index'
import './index.css'
import './tailwind.css'
import 'ant-design-vue/dist/reset.css'

// 页面初始加载状态
let initState = false

const createMyApp = () => {
    // axios 拦截器
    axiosInterceptors({
        request: config => {
            // 页面初始化才携带 toekn 否则会导致 pinia 提前调用无法加载
            if (initState) {
                const { userInfo } = storeToRefs(useUserInfoStore())

                if (userInfo.value.token) {
                    config.headers['Token'] = userInfo.value.token
                }
            }

            return config
        },
        response: async (response) => {
            const { data = '', code, message } = response.data

            switch (code) {
                // 成功返回
                case 1:
                case 200:
                    return response.config.returnAll ? response.data : data
                // 登录失效返回
                case 401:
                case 411:
                    if (initState) {
                        router.push('/login')
                    }
                    return onFetchErr(response.data)
                // 默认提示后端返回错误信息
                default:
                    return onFetchErr(response.data)
            }
        },
    })

    return siteSwitch => new Promise((resolve, reject) => {
        if (siteSwitch) {
            createSocket('')

            const app = createApp(defineAsyncComponent(() => import('@/App.vue')))

            app.use(CustomComponents)

            const pinia = createPinia()
            pinia.use(piniaPluginPersistedstate)
            app.use(pinia)

            app.use(router)

            app.mount('#app')
            resolve()
        } else {
            const app = createApp(defineAsyncComponent(() => import('@/Close.vue')))
            app.mount('#app')
            reject()
        }
        initState = true
    })
}

// 需先校验网站开关
useSiteConfig(createMyApp())
