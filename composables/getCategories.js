export async function getCategories() {
    const {data} = await useAPI("/categories", {
        method: "get"
    });

    return data;
}
