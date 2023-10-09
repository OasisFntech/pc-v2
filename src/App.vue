<template>
    <a-config-provider
        :locale="zhCN"
        :theme="{
            token: {
                colorPrimary
            }
        }"
    >
        <router-view />
    </a-config-provider>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const colorPrimary = '#447DF6'

// 设置 :root 的 CSS 变量
document.documentElement.style.setProperty('--primary', colorPrimary)
</script>
