<template>
    <a-tabs v-model:active-key="activeKey">
        <a-tab-pane
            v-for="({ title, key, panel }) in tabs"
            :key="key"
        >
            <template #tab>
                <div class="flex items-center">
                    <span>{{ title }}</span>
                    
                    <Icon v-if="panel" class="ml-2">
                        <CaretDownOutlined />
                    </Icon>
                </div>
            </template>
        </a-tab-pane>
    </a-tabs>
    
    <component :is="component" />
</template>

<script setup>
import { h, ref, computed } from 'vue'
import { Icon } from '@vicons/utils'
import { CaretDownOutlined } from '@vicons/antd'

import Mark from './components/Mark.vue'

const tabs = [
        {
            title: '行情',
            key: 'market'
        },
        {
            title: '自选',
            key: 'diy'
        },
        {
            title: '全部',
            key: 'all'
        },
        {
            title: '沪市主板',
            key: 'shanghai'
        },
        {
            title: '深市主板',
            key: 'shenzhen'
        },
        {
            title: '中小主板',
            key: 'middle'
        },
        {
            title: '创业板',
            key: 'chuangye'
        },
        {
            title: '热门概念',
            key: 'hot_1',
            panel: true
        },
        {
            title: '热门行业',
            key: 'hot_2',
            panel: true
        },
        {
            title: '地区',
            key: 'area',
            panel: true
        }
    ],
    activeKey = ref(tabs[0].key)

const component = computed(() => {
    if (activeKey.value === 'market') return h(Mark)
    return h('div')
})

defineOptions({ name: 'market' })
</script>

<style scoped>

</style>
