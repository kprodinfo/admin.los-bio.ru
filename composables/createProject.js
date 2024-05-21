export async function createProject(project) {
    const {data} = await useAPI(`/projects`, {
        body: project,
        method: "post"
    })

    return data.value;
}
