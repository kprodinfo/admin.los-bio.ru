export async function getProject(slug) {
    const {data} = await useAPI(`/projects/${slug}`, {
        method: "get",
    });
    
    return data;
}
