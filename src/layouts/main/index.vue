<template>
    <div class="w-full h-full min-w-[1200px] min-h-[800px] flex">
        <Aside />

        <div class="w-1 flex-1">
            <Header />

            <div class="main-content">
                <router-view />
            </div>
            
            <RealTime />
        </div>
    </div>

    <a-modal
        v-model:open="visible"
        :title="popup.title"
        destroyOnClose
        @cancel="onClose"
    >
        <div
            class="popupModal-content my-10"
            v-html="decodeURIComponent(popup.content)"
        />

        <template #footer>
            <a-button
                type="primary"
                size="large"
                block
                @click="onClose"
            >
                确认
            </a-button>
        </template>
    </a-modal>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import Aside from './components/Aside.vue'
import Header from './components/Header.vue'
import RealTime from './components/RealTime.vue'
import { usePopupStore } from 'frontend_common/store'

const popupStore = usePopupStore(),
    { onClose } = popupStore,
    { visible, popup } = storeToRefs(popupStore)

defineOptions({ name: 'MainLayout' })
</script>

<style scoped>
.popupModal-content {
    max-height: 45vh;
    overflow: auto;
}

:deep(.ant-modal) img {
    max-width: 100%;
}

.main-content {
    /*
        header 48px
        realTime 32px
    */
    height: calc(100% - 48px - 32px);
    @apply p-2.5 overflow-auto bg-[#fafafa];
}
</style>
