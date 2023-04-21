import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"

export default function ProtectedRoutes() {

    const { user, loadingUser } = useAuth()

    if (loadingUser) {
        return null
    }

    return (
        <>
            {user ? <Outlet /> : <Navigate to="/" />}
        </>
    )
}