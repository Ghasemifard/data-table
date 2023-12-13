"use client"
import { User,columns } from "./columns";
import { DataTable } from "./data-table";
import {useQuery} from "react-query"

async function getUsers():Promise<User[]> {
    try {
        const res = await fetch(
            'https://mocki.io/v1/3361b3fd-79ad-45c2-aba4-3ee66cc9230c'
        )
        const data = await res.json()
        return data; 
    } catch (error) {
        
        throw new Error('Error fetching user data');
    }

}
export default  function HomePage() {
    // const data = await getUsers()
    const { data, isLoading, isError } = useQuery("users", getUsers);
    if (isLoading) {
        return <p>Loading...</p>;
      }
    
      if (isError|| data === undefined) {
        return <p>Error loading data</p>;
      }

  return (
    <section className="flex justify-center items-center">
      <div className="max-w-7xl container items-center bg-white">
        <DataTable columns={columns} data={data}/>
      </div>
    </section>
  );
}

