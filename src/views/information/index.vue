<template>
    <div class="h-full flex gap-1">
        <NewsFlash />

        <c-card class="w-2/3 min-w-[480px]">
            <template #title>
                <div class="flex gap-5">
                    <span class="cursor-pointer text-card_title">A股</span>
                    <span class="cursor-pointer text-gray-400 ">要闻</span>
                </div>

                <img
                    src="@/assets/refresh.png"
                    alt="refresh"
                    class="w-4 cursor-pointer"
                    :class="{
                    'animate-spin': loading
                }"
                    @click="onRefresh"
                >
            </template>
        </c-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import NewsFlash from './components/NewsFlash.vue'
import News from './components/News.vue'

const activeKey = ref('stock')

defineOptions({ name: 'information' })
</script>

<style scoped>

</style>
