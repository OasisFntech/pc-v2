<template>
    <c-form
        class="mt-6"
        v-model="formState"
        :form-config="formConfig"
        :form-props="{
            layout: 'vertical',
            model: formState
        }"
        @finish="onFinish"
    >
        <div class="mb-6 flex items-center">
            <a-tooltip title="自动登录功能需要记住密码">
                <a-checkbox
                    :disabled="!remember"
                    v-model:checked="autoLogin"
                >
                    自动登录
                </a-checkbox>
            </a-tooltip>

            <a-checkbox :checked="remember" @change="onChangeRemember">
                记住密码
            </a-checkbox>

            <router-link
                to="/forget"
                class="ml-auto"
                replace
            >
                忘记密码？
            </router-link>
        </div>

        <a-button
            class="mb-6"
            type="primary"
            html-type="submit"
            block
            :loading="loading"
        >
            登录
        </a-button>
    </c-form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useLocalStorage } from '@vueuse/core'

import { useAccountLogin } from 'frontend_common/hooks'

const { formState, formConfig, loading, onAccountLogin } = useAccountLogin({
    successTip: message.success,
    warnTip: message.warn,
    errorTip: message.error,
})

const accountInfo = useLocalStorage('accountInfo', {}),
    remember = ref(Boolean(accountInfo.value.password)),
    autoLogin = useLocalStorage('autoLogin', false)

const onChangeRemember = ({ target: { checked } }) => {
    autoLogin.value = checked
    remember.value = checked
}

onMounted(() => {
    if (remember.value) {
        formState.account = accountInfo.value.account
        formState.password = accountInfo.value.password

        if (autoLogin.value) {
            onFinish(accountInfo.value)
        }
    }
})

const { replace } = useRouter()

const onFinish = async(values) => {
    await onAccountLogin(values)

    if (remember.value) {
        accountInfo.value = {
            account: values.account,
            password: values.password
        }
    } else {
        accountInfo.value = {}
        autoLogin.value = false
    }

    replace('/market')
}

defineOptions({ name: 'AccountLogin' })
</script>

<style scoped>

</style>
