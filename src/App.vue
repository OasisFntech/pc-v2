<template>
    <a-config-provider
        :locale="zhCN"
        :theme="{
            token: {
                colorPrimary: '#efb67b'
            }
        }"
    >
        <router-view />
    </a-config-provider>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>
