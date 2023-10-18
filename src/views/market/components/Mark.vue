<template>
    <div class="flex flex-wrap gap-2.5">
        <c-card>
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
        
        <c-card>
        
        </c-card>
    </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useStockMarketStore } from 'frontend_common/store'
import { TOTAL_MARKET_SOCKET } from 'frontend_common/fetch'
import { utils_colorful } from 'frontend_common/utils/index.js'

const { totalMarket } = storeToRefs(useStockMarketStore())

const plateIndex = ref(0),
    showPlate = computed(() => {
        return totalMarket.value.indexPlate[plateIndex.value] ?? {}
    })

TOTAL_MARKET_SOCKET.emit([ '' ])

onBeforeUnmount(() => {
    TOTAL_MARKET_SOCKET.close()
})

defineOptions({ name: 'Mark' })
</script>

<style scoped>
</style>
