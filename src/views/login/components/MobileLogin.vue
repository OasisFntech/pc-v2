<template>
    <a-form
        layout="vertical"
        ref="formRef"
        :model="formState"
        @finish="onMobileLogin"
    >
        <a-row>
            <a-col :span="24">
                <a-form-item v-bind="mobileFormConfig.itemProps">
                    <a-input
                        v-model:value="formState[mobileFormConfig.itemProps.name]"
                        allow-clear
                        :maxlength="11"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item v-bind="codeFormConfig.itemProps">
                    <a-input-search
                        v-model:value="formState[codeFormConfig.itemProps.name]"
                        allow-clear
                        :maxlength="6"
                    >
                        <template #enterButton>
                            <a-button
                                :disabled="smsBtn.disabled"
                                :loading="smsBtn.loading"
                                @click="onSendValid"
                            >
                                {{ smsBtn.text }}
                            </a-button>
                        </template>
                    </a-input-search>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item>
                    <a-button
                        type="primary"
                        html-type="submit"
                        block
                        :loading="loading"
                    >
                        登录
                    </a-button>
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

import { useMobileLogin, useSms } from 'frontend_common/hooks'

const formRef = ref()

const {
        formState,
        formConfig,
        loading,
        onMobileLogin
    } = useMobileLogin(),
    { smsBtn, onSendSms } = useSms('mobile-login', { successTip: message.success, errorTip: message.error })

const [ mobileFormConfig, codeFormConfig ] = formConfig

const onSendValid = async() => {
    if (!smsBtn.value.loading && formRef.value) {
        const { mobile } = await formRef.value.validate('mobile')
        onSendSms(mobile)
    }
}

defineOptions({ name: 'MobileLogin' })
</script>

<style scoped>

</style>
