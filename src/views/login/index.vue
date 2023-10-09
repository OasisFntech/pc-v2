<template>
    <a-tabs v-model:activeKey="loginMode">
        <a-tab-pane
            v-for="({ title, key, children }) in tabs"
            :key="key"
        >
            <template #tab>
                <span class="text-xl" :class="{ 'font-bold': loginMode === key }">
                    {{ title }}
                </span>
            </template>

            <component :is="children" />
        </a-tab-pane>
    </a-tabs>
</template>

<script setup>
import { ref } from 'vue'

import AccountLogin from './components/AccountLogin.vue'
import MobileLogin from './components/MobileLogin.vue'

const tabs = [
    { title: '账号登录', key: 'account', children: AccountLogin },
    { title: '手机号登录', key: 'mobile', children: MobileLogin }
]

const loginMode = ref(tabs[0].key)

defineOptions({ name: 'login' })
</script>

<style scoped>

</style>
