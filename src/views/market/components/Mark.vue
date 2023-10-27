<template>
    <div class="market">
        <c-card class="col-span-2">
            <template #title>
                <div class="flex items-center gap-5 text-sm">
                    <div
                        class="cursor-pointer"
                        v-for="(p, i) in totalMarket.indexPlate"
                        :key="p.indexCode"
                        :class="[ plateIndex === i ? 'text-primary text-base' : 'text-gray-500' ]"
                        @click="plateIndex = i"
                    >
                        {{ p.indexName }}
                    </div>
                </div>
            </template>
            
            <div class="flex items-center text-sm" :class="utils_colorful(showPlate.indexIncrease)">
                <span class="text-base">{{ showPlate.indexPrice }}</span>
                <span class="mx-5">{{ showPlate.indexRiseFall }}</span>
                <span>{{ showPlate.indexIncrease }}%</span>
            </div>
        </c-card>
        
        <c-card
            title="今日股市"
            class="col-span-1"
            content-class="flex flex-col justify-evenly"
        >
            <MarketTrend
                class="h-[200px]"
                :option="{
                    grid: {
                        top: 10,
                        left: -40,
                        right: 0,
                        bottom: 10,
                        containLabel: true
                    }
                }"
            />
            
            <div>
                <div class="flex items-center justify-between mb-2.5 text-sm">
                    <span>涨 {{ analysis.raise }} 家</span>
                    <span>跌 {{ analysis.fall }} 家</span>
                </div>
                <div class="w-full h-2 overflow-hidden flex items-center">
                    <div :style="{ width: analysis.raisePercent + '%' }" class="h-full bg-raise" />
                    <div :style="{ width: analysis.flatPercent + '%' }" class="h-full bg-[#d8d8d8]" />
                    <div :style="{ width: analysis.fallPercent + '%' }" class="h-full bg-fall" />
                </div>
            </div>
        </c-card>
        
        <c-card title="领涨概念" class="col-span-1">
            <CTable
                fixed
                :columns="columns"
                :data-source="response"
            />
        </c-card>
        
        <c-card title="五分钟涨幅榜" class="col-span-1">
            <CTable
                fixed
                :columns="columns"
                :data-source="response"
            />
        </c-card>
        
        <c-card title="五分钟跌幅榜" class="col-span-1">
            <CTable
                fixed
                :columns="columns"
                :data-source="response"
            />
        </c-card>
        
        <c-card title="日价格振幅帮" class="col-span-1">
            <CTable
                fixed
                :columns="columns"
                :data-source="response"
            />
        </c-card>
        
        <c-card title="日换手率榜" class="col-span-1">
            <CTable
                fixed
                :columns="columns"
                :data-source="response"
            />
        </c-card>
    </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useStockMarketStore } from 'frontend_common/store'
import { useMarketAnalysis } from 'frontend_common/hooks'
import { STOCK_PLATE_CODE } from 'frontend_common/config'
import {
    useRequest,
    doParams,
    COMMON_API_PATH,
    STOCK_BLOCK_SOCKET,
    SOCKET_URL
} from 'frontend_common/fetch'
import { utils_colorful, utils_base64, utils_table_render_amount } from 'frontend_common/utils'
import CTable from 'frontend_common/components/CTable/index.vue'
import MarketTrend from 'frontend_common/components/MarketTrend/index.vue'

const { totalMarket } = storeToRefs(useStockMarketStore()),
    analysis = useMarketAnalysis()

const plateIndex = ref(0),
    showPlate = computed(() => {
        return totalMarket.value.indexPlate[plateIndex.value] ?? {}
    })

const columns = [
    {
        title: '行业',
        dataIndex: 'plateName',
        align: 'left'
    },
    {
        title: '涨跌幅',
        dataIndex: 'plateIncrease',
        render: ({ value }) => utils_table_render_amount({ amount: value, suffix: '%', symbol: true })
    },
    {
        title: '领涨股',
        dataIndex: 'stockName',
        align: 'right'
    }
]

const { response } = useRequest({
    url: `${COMMON_API_PATH.DO}?event=${SOCKET_URL.BLOCK}`,
    initialValues: [],
    params: computed(() => {
        return doParams([
            STOCK_PLATE_CODE.ALL,
            2,
            '',
            1,
            'increase',
            0,
            12
        ])
    }),
    formatResult: res => utils_base64(res),
    onSuccess: (_, { params }) => {
        STOCK_BLOCK_SOCKET.emit(params)
    },
})

STOCK_BLOCK_SOCKET.on(res => {
    response.value = res
})

onBeforeUnmount(() => {
    STOCK_BLOCK_SOCKET.close()
})

defineOptions({ name: 'Mark' })
</script>

<style scoped>
.market {
    height: calc(100% - 62px);
    @apply grid grid-cols-4 gap-2.5;
}
</style>
