<template>
    <div class="flex w-full h-full">
        <img
            :src="response.logoAddress"
            alt="cover"
            class="w-1/2 block"
        >

        <div class="w-1/2 h-full px-[100px] flex flex-col justify-center items-center">
            <router-view />
            
            <a-button type="link" to="/register" replace>
                注册账号
            </a-button>
        </div>
    </div>
</template>

<script setup>
import { useRequest } from 'frontend_common/fetch'
import { API_PATH } from '@/apis'

const { response } = useRequest({
    url: API_PATH.CONFIG,
    initialValues: {
        logoAddress: ''
    }
})

defineOptions({ name: 'CoverLayout' })
</script>

<style scoped>

</style>
