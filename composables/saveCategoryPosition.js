export async function saveCategoryPosition(slug, position) {
    const { data } = await useAPI("/categories/position", {
        method: "post",
        body: {
            slug,
            position
        }
    })

    return data.value;
}
