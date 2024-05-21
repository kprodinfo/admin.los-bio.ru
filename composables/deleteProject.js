export async function deleteProject(id) {
    const { data } = await useAPI(`/projects/${id}`, {
        method: "delete",
    })

    return data.value;
}
