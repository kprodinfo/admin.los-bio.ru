import {defineStore} from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
    }),
    actions: {
        setAuth(status) {
            this.authenticated = status;
            if(!status) {
                const token = useCookie('token');
                token.value = null;
            }
            
            return status;
        },
        async login(email, password) {
            // useFetch from nuxt 3
            const response = await useAuth(email, password);

            console.log(response);
            if (response.type === "token") {
                const token = useCookie('token');
                token.value = response.data.token;
                this.authenticated = true;
            }
            
            return response;
        }
    },
});
