export async function useCheckAuth() {
    const { data, error } = await useAPI("/auth", {
        method: "post"
    })
    
    if(error.value) {
        return {
            value: {
                data: false
            }
        }
    }

    return data;
}
