export async function getProjects() {
    const {data} = await useAPI(`/projects`, {
        method: "get",
    });

    
    return data;
}
