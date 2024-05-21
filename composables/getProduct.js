export async function getProduct(slug) {
    const {data} = await useAPI(`/products/${slug}`, {
        method: "get",
    });
    
    return data;
}
