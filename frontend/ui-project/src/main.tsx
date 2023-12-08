import ReactDOM from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from "react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NotFound from "./pages/not-found/NotFoundPage.tsx";
import HomePage from "./pages/home/HomePage.tsx";

const queryClient: QueryClient = new QueryClient();
const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage/>,
        },
        {
            path: "*",
            element: <NotFound/>
        }
    ])
;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
    </QueryClientProvider>
)
