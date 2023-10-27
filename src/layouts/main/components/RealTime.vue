<template>
    <div class="realTime">
        <span>{{ totalMarket.stockStatus }}</span>
        
        <div
            v-for="({ indexCode, indexName, indexPrice, indexRiseFall, indexIncrease }) in totalMarket.indexPlate"
            :key="indexCode"
        >
            <span class="mr-2.5">{{ indexName }}</span>
            
            <span class="" :class="utils_colorful(indexRiseFall)">
                <span>{{ indexPrice }}</span>
                <span class="mx-2.5">{{ indexRiseFall }}</span>
                <Amount :amount="indexIncrease" suffix="%" symbol />
            </span>
        </div>
    </div>
</template>

<script setup>
import { onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useStockMarketStore } from 'frontend_common/store'
import { TOTAL_MARKET_SOCKET } from 'frontend_common/fetch'
import { utils_colorful } from 'frontend_common/utils'
import Amount from 'frontend_common/components/Amount/index.vue'

const { totalMarket } = storeToRefs(useStockMarketStore())

TOTAL_MARKET_SOCKET.emit([ '' ])

onBeforeUnmount(() => {
    TOTAL_MARKET_SOCKET.close()
})

defineOptions({ name: 'RealTime' })
</script>

<style scoped>
.realTime {
    box-shadow: 0 -2px 10px rgba(0, 0, 0, .1);
    @apply h-8 flex gap-10 items-center text-sm px-4;
}
</style>
