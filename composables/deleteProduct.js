export async function deleteProduct(id) {
    const { data } = await useAPI(`/products/${id}`, {
        method: "delete",
    })

    return data.value;
}
