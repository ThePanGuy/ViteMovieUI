import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./components/login_pages/LoginPage.tsx";
import ErrorPage from "./components/error_pages/ErrorPage.tsx";
import MoviesPage from "./components/secured/MoviesPage.tsx";
import {SignUpPage} from "./components/login_pages/SignUpPage.tsx";
import {NoAccessPage} from "./components/error_pages/NoAccessPage.tsx";
import {AuthProvider} from "./components/AuthContext.tsx";
import Home from "./components/Home.tsx";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
        {
            path: "/",
            element: <Home/>,
            errorElement: <ErrorPage/>
        },
        {
            path: "/secured",
            element: <MoviesPage/>
        },
        {
            path: '/login',
            element: <LoginPage/>
        },
        {
            path: "/sign-up",
            element: <SignUpPage/>
        },
        {
            path: "/error-no-access",
            element: <NoAccessPage/>
        }
    ])
;

root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </React.StrictMode>
);
