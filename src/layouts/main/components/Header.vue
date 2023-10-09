<template>
    <div class="header h-12 bg-dark flex items-center justify-between px-4">
        <div>
            <a-input-search
                size="small"
                placeholder="股票名称/代码"
            />
        </div>
        
        <div class="operation-bar">
            <span>客服</span>
            <span>消息</span>
            <span>问题反馈</span>
            <span>设置</span>
        </div>
    </div>
</template>

<script setup>
defineOptions({ name: 'Header' })
</script>

<style scoped>
.operation-bar {
    @apply text-gray-500 flex gap-2.5 cursor-pointer;
}

.operation-bar > span {
    @apply hover:text-white;
}
</style>
