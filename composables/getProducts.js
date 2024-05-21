export async function getProducts(category) {
    const {data} = await useAPI(`/products/category/${category}`, {
        method: "get",
    });

    
    return data;
}
