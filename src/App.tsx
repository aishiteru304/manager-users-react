import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/login/login"
import AdminUserPage from "./pages/admin/user/managerUser"
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "./redux/UserSlice";
import { AdminRoute, AuthRoute } from "./routes";
import AdminSummaryPage from "./pages/admin/summary/summary";

function App() {
  const dispatch = useDispatch()
  const accessToken = sessionStorage.getItem('accessToken');
  const user = sessionStorage.getItem('user');

  if (accessToken && user) {
    dispatch(setAccessToken({ accessToken }))
    dispatch(setUser(JSON.parse(user)))
  }

  return (
    <Routes>
      <Route path="/" element={<AuthRoute><LoginPage /></AuthRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminUserPage /></AdminRoute>} />
      <Route path="/admin/summary" element={<AdminRoute><AdminSummaryPage /></AdminRoute>} />
    </Routes>
  )
}

export default App
