import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NotFound from "./pages/not-found/NotFoundPage.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import "./style/globals.scss"
import LoginPage from "./pages/auth/LoginPage.tsx";
import CreateProfilePage from "./pages/profile/CreateProfilePage.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";

const queryClient: QueryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/register",
        element: <RegisterPage/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/create-profile",
        element: <CreateProfilePage/>
    },
    {
        path: "/profile/",
        element: <ProfilePage/>
    },
    {
        path: "*",
        element: <NotFound/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
    </QueryClientProvider>
)