import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import { RootState } from "../redux/store";

export const AuthRoute = ({ children }: { children: JSX.Element }) => {
    const user = useSelector((state: RootState) => state.user)
    return (user.accessToken && user.role == "ADMIN") ? <Navigate to='/admin/summary' /> : children;
}

// export const PublicRoute = ({ children }: { children: JSX.Element }) => {
//     const accessToken = useSelector((state: RootState) => state.user.accessToken)
//     return accessToken ? <Navigate to='/' /> : children;
// }

// export const PraviteRoute = ({ children }: { children: JSX.Element }) => {
//     const accessToken = useSelector((state: RootState) => state.user.accessToken)
//     return accessToken ? children : <Navigate to='/login' />;
// }

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const user = useSelector((state: RootState) => state.user)
    return user.role == 'ADMIN' ? children : <Navigate to='/' />;
}