export async function getGroupInfo(name) {
    const {data} = await useAPI(`/info/group/${name}`)

    if(data.value === "") {
        return [];
    }
    
    return data.value.map(item => {
        return {
            ...item,
            value: JSON.parse(item.value)
        }
    })
}
