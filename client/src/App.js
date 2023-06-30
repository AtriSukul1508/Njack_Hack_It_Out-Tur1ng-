import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'

/** import all components */
const Username = lazy(() => import('./components/Username'));
const Password = lazy(() => import('./components/Password'));
const Register = lazy(() => import('./components/Register'));
const Profile = lazy(() => import('./components/Profile'));
const Recovery = lazy(() => import('./components/Recovery'));
const Reset = lazy(() => import('./components/Reset'));
const PageNotFound = lazy(() => import('./components/PageNotFound'));


/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile /></AuthorizeUser>
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
