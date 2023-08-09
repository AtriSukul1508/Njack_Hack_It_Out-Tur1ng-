import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/** import all components */
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const Profile = lazy(() => import('./components/Profile'));
const Recovery = lazy(() => import('./components/Recovery'));
const Reset = lazy(() => import('./components/Reset'));
const PageNotFound = lazy(() => import('./components/PageNotFound'));


/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Login></Login>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/profile',
        element : <Profile />
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
])

export default function App() {
  return (
    <main>
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router}></RouterProvider>
        </Suspense>
    </main>
  )
}
