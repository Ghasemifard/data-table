export async function fetchData(url:string) {
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching data: ${(error as Error).message}`);
    }
}