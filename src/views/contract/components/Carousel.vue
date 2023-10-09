<template>
    <a-carousel  arrows>
        <template #prevArrow>
            <div class="custom-slick-arrow">
                <Icon size="42" color="white">
                    <IosArrowDropleft />
                </Icon>
            </div>
        </template>
        
        <template #nextArrow>
            <div class="custom-slick-arrow">
                <Icon size="42" color="white">
                    <IosArrowDropright />
                </Icon>
            </div>
        </template>
        
        <a-image
            v-for="(r, i) in carousel"
            :key="i"
            :preview="false"
            :src="r.urlAddress"
        />
    </a-carousel>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Icon } from '@vicons/utils'
import { IosArrowDropleft, IosArrowDropright } from '@vicons/ionicons4'
import { useCarouselStore } from 'frontend_common/store'

const carouselStore = useCarouselStore(),
    { onGetCarousel } = carouselStore,
    { carousel } = storeToRefs(carouselStore)

onMounted(() => {
    onGetCarousel(0)
})

defineOptions({ name: 'Carousel' })
</script>

<style scoped>
:deep(.slick-arrow.slick-prev) {
    @apply !start-6 !z-10;
}

:deep(.slick-arrow.slick-next) {
    @apply !end-10 z-50;
}

:deep(.ant-image) {
    width: 100%;
}

:deep(.ant-image-img) {
    height: 156px;
}
</style>
