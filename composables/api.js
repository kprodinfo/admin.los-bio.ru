export async function useAPI(path, config = {}) {
    const runtimeConfig = useRuntimeConfig();

    const tokenCookie = useCookie("token");
    const token = tokenCookie.value;
    
    const {data, pending, error, refresh} = await useFetch(path, {
        ...config,
        baseURL: runtimeConfig.public.BASE_API_URL,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    
    return {data, pending, error, refresh}
}
