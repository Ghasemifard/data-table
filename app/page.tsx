"use client"
import { User,columns } from "./components/Columns";
import { DataTable } from "./components/DataTable";
import {useQuery} from "react-query"
import { fetchData } from "./utils/fetchData";

async function getUsers():Promise<User[]> {
    return fetchData('https://mocki.io/v1/3361b3fd-79ad-45c2-aba4-3ee66cc9230c');

}
export default  function HomePage() {
    const { data, isLoading, isError } = useQuery("users", getUsers);
    if (isLoading) {
        return <p>Loading...</p>;
      }
    
      if (isError|| data === undefined) {
        return <p>Error loading data</p>;
      }

  return (
    <section className="flex justify-center items-center">
        <DataTable columns={columns} data={data}/>
    </section>
  );
}

