<template>
    <div class="aside h-full w-14 bg-dark">
        <img
            :src="siteConfig.titleAddress"
            alt="logo"
            class="block w-10 mx-auto my-4"
        >
        
        <div
            v-for="({ title, path, icon }) in nav"
            :key="path"
            class="flex flex-col items-center cursor-pointer mt-2.5"
            @click="$router.replace(path)"
        >
            <c-icon
                :name="`aside_${icon}${$route.path === path ? '_active' : ''}`"
                :alt="title"
                class="w-6"
            />
            <p class="text-sm mt-1" :class="[ $route.path === path ? 'text-active' : 'text-text' ]">
                {{ title }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useSiteConfigStore } from 'frontend_common/store'

const { siteConfig } = storeToRefs(useSiteConfigStore())

const nav = [
    {
        title: '行情',
        path: '/market',
        icon: 'market'
    },
    {
        title: '个股',
        path: '/stock',
        icon: 'stock'
    },
    {
        title: '合约',
        path: '/contract',
        icon: 'contract'
    },
    {
        title: '账户',
        path: '/account',
        icon: 'account'
    },
    {
        title: '资讯',
        path: '/information',
        icon: 'information'
    }
]

defineOptions({ name: 'Aside' })
</script>

<style scoped>

</style>
