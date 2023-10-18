import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import ViteComponents from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8899,
        host: true,
        open: true,
        proxy: {
            '/api': {
                target: 'http://47.242.95.133:21004',
                ws: true,
                changeOrigin: true
            },
            '/socket.io/': {
                target: 'http://47.242.95.133:21003',
                ws: true,
                changeOrigin: true
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        },
    },
    plugins: [
        vue({
            script: {
                defineModel: true
            }
        }),
        ViteComponents({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false
                })
            ]
        })
    ]
})
