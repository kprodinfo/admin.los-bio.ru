export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie("token");
    console.log(token);
    /* Если есть токен */
    if (token.value) {
        return navigateTo("/");
    }
})
