export async function updateProject(id, project) {
    const {data} = await useAPI(`/projects/${id}`, {
        body: project,
        method: "patch"
    })

    return data.value;
}
