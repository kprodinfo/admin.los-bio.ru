export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie("token");
    /* Если есть токен */
    if (token.value) {
        return navigateTo("/");
    }
})
