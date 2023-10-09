<template>
    <c-card class="w-1/3 min-w-[320px] h-full">
        <template #title>
            <span class="text-card_title">快讯</span>

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

        <a-timeline :pending="loading">
            <a-list :data-source="list" :loading="loading">
                <template #renderItem="{ item }">
                    <a-timeline-item
                        color="grey"
                        :key="item.id"
                        class="text-active"
                    >
                        <p>{{ item.publishDate }}</p>
                        <p class="text-xs">{{ item.inhalt }}</p>
                    </a-timeline-item>
                </template>

                <template #loadMore>
                    <div
                        v-show="!loading && !finished"
                        class="block mt-5 text-center text-gray-200 underline cursor-pointer"
                        @click="onLoadMore"
                    >
                        加载更多
                    </div>
                </template>
            </a-list>
        </a-timeline>
    </c-card>
</template>

<script setup>
import { useNewsFlash } from 'frontend_common/hooks'

const { list, finished, loading, onRefresh, onLoadMore } = useNewsFlash()

defineOptions({ name: 'NewsFlash' })
</script>

<style scoped>
:deep(.ant-timeline-item-tail) {
    border-color: #333;
}
</style>
