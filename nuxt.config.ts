// @ts-ignore
export default defineNuxtConfig({
    server: {
        port: 1001,
    },
    devServer: {
      port: 1001,  
    },
    app: {
        head: {
            charset: "utf-8",
            viewport: "width=1300, initial-scale=1"
        },
    },
    runtimeConfig: {
        public: {
            BASE_API_URL: process.env.NUXT_PUBLIC_BASE_API_URL,
            FILES_URL: process.env.NUXT_PUBLIC_FILES_URL,
        },
    },
    middleware: [],
    css: ['~/assets/styles/main.scss'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/styles/_variables.scss" as *;'
                }
            }
        }
    },
    modules: ['nuxt-svgo', 'vue3-perfect-scrollbar/nuxt', '@pinia/nuxt'],
    svgo: {
        defaultImport: "component",
        componentPrefix: 'ui-icon',
        autoImportPath: './assets/svg/',
    }
})
