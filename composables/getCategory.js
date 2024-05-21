export async function getCategory(slug) {
    const { data } = await useAPI(`/categories/${slug}`, {
        method: "get"
    })
    
    return data.value;
}
