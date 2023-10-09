<template>
    <div class="c-card bg-dark h-full">
        <div class="bg-card h-8 flex items-center justify-between px-5">
            <slot name="title">
                <span class="text-card_title">{{ title }}</span>
            </slot>
        </div>

        <div class="card-content p-5 overflow-auto relative">
            <slot />
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String
    }
})

defineOptions({ name: 'C-Card', inheritAttrs: true })
</script>

<style scoped>
.card-content {
    /* title 32px */
    height: calc(100% - 32px);
}
</style>
