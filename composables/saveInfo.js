export async function saveInfo(name, value) {
    const { data } = await useAPI("/info", {
        method: "post",
        body: {
            name, value
        }
    })

    console.log(data);
    
    return data.value;
}
