import { User,columns } from "./columns";
import { DataTable } from "./data-table";

async function getUsers():Promise<User[]> {
    const res = await fetch(
        'https://mocki.io/v1/3361b3fd-79ad-45c2-aba4-3ee66cc9230c'
    )
    const data = await res.json()
    return data
}
export default async function userPage() {
    const data = await getUsers()

  return (
    <section className="p-5">
      <div className="container">
        <h1 className="text-3xl font-bold">All Users</h1>
        <DataTable columns={columns} data={data}/>
      </div>
    </section>
  );
}
