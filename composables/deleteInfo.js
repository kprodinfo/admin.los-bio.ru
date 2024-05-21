export async function deleteInfo(name) {
    const { data } = await useAPI(`/info/${name}`, {
        method: "delete"
    })

    return data.value;
}
