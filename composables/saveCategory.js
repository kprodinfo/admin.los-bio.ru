export async function saveCategory(category) {
    const {data} = await useAPI("/categories", {
        body: category,
        method: "post"
    })

    return data.value;
}
