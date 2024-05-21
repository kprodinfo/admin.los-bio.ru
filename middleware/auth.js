import {useAuthStore} from "~/store/auth.js";
import {navigateTo} from "#app";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useAuthStore();
    const token = useCookie("token");

    /* Если есть токен */
    if (token.value) {
        /* Проверяем, валидный ли токен */
        const isAuth = await useCheckAuth();
        if (isAuth.value) {
            await store.setAuth(true);
        } else {
            await store.setAuth(false);
        }
    } else {
        if (!store.authenticated && to.path !== "/auth/sign-in") {
            return navigateTo("/auth/sign-in");
        }
    }
})
