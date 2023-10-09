<template>
    <div class="flex justify-between">
        <div class="flex-1">
            <c-card title="申请合约">
                <ContractCreate />
            </c-card>
        </div>
        <div style="flex: 2;" class="mx-2.5 w-1">
            <Carousel />
        </div>
        <div class="flex-1">
            <c-card title="温馨提示">
            
            </c-card>
        </div>
    </div>
</template>

<script setup>
import Carousel from './components/Carousel.vue'
import ContractCreate from './components/ContractCreate.vue'

defineOptions({ name: 'contract' })
</script>

<style scoped>

</style>
