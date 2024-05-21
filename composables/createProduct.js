export async function createProduct(product) {
    const {data} = await useAPI(`/products`, {
        body: product,
        method: "post"
    })

    return data.value;
}
