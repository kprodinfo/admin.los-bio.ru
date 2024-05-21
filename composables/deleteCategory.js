export async function deleteCategory(slug) {
    const { data } = await useAPI("/categories", {
        method: "delete",
        body: {
            slug
        }
    })

    return data.value;
}
