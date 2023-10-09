import Form from '@/components/Form/Form.vue'
import Card from '@/components/Card/index.vue'
import Icon from '@/components/Icon/index.vue'

export default {
    install(Vue) {
        Vue.component('c-form', Form)
        Vue.component('c-card', Card)
        Vue.component('c-icon', Icon)
    }
}
