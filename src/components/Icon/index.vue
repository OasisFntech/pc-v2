<template>
    <img
        :alt="name"
        :src="imgSrc"
        :style="{
            width: sizePx
        }"
    />
</template>

<script setup>
import { computed, ref, onUpdated } from 'vue'

const props = defineProps({
    name: String,
    imgType: {
        type: String,
        default: 'png',
        validator: value => {
            return [ 'png', 'jpg', 'jepg', 'svg' ].includes(value)
        },
    },
    size: {
        type: Number,
        default: 18,
    }
})

const imgSrc = ref(''),
    sizePx = computed(() => `${props.size}px`)

const onLoadImag = async () => {
    const file = await import(`./assets/${props.name}.${props.imgType}`)
    
    imgSrc.value = file.default
}

onLoadImag()

onUpdated(() => {
    onLoadImag()
})

defineOptions({ name: 'C-Icon' })
</script>

<style scoped>

</style>
