export async function getInfo(name) {
    const { data } = await useAPI(`/info/${name}`, {
        method: "get",
    });

    if(data.value === "") {
        return [];
    }
    
    return JSON.parse(data.value.value);
}
