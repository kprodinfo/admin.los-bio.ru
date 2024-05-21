export async function updateProduct(id, product) {
    const {data} = await useAPI(`/products/${id}`, {
        body: product,
        method: "patch"
    })

    return data.value;
}
