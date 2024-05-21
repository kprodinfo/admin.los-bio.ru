import {defineStore} from 'pinia';

export const useIndexStore = defineStore('index', {
    state: () => ({
        customTitle: "Кастомный тайтл",
    }),
    actions: {
        setTitle(title) {
            this.customTitle = title;
        }
    },
});
