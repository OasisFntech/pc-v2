<template>
    <div class="c-card">
        <div class="c-card__header">
            <slot name="title">
                <span class="text-card_title">{{ title }}</span>
            </slot>
        </div>

        <div class="c-card__content" :class="contentClass">
            <slot />
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    contentClass: String
})

defineOptions({ name: 'C-Card', inheritAttrs: true })
</script>

<style scoped>
.c-card {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, .08);
    @apply h-full overflow-hidden;
}

.c-card__header {
    @apply bg-grey h-8 flex items-center justify-between px-2.5;
}

.c-card__content {
    /* title 32px */
    height: calc(100% - 32px);
    @apply p-2.5 overflow-auto bg-white;
}
</style>
