"use client"
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a new instance of the React Query client
const reactQueryClient = new QueryClient();

// Define a React component to provide the React Query client to the application
export const ReactQueryProvider = ({children}:{children:React.ReactNode})=>{

    return <QueryClientProvider client={reactQueryClient}>{children}</QueryClientProvider>
}
