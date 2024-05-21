import {ref} from "vue";
import axios from "axios";

export function useAxios(
    path,
    initialOptions = {},
    needToken = true
) {
    const response = ref();
    const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:1000" : "https://api.los-bio.ru";
    let options = initialOptions;
    const tokenCookie = useCookie("token");
    const token = tokenCookie.value;
    
    if (needToken) {
        options = Object.assign(options, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    const request = async () => {
        response.value = await axios(baseURL + path, options);
    };

    return {response, request};
}
