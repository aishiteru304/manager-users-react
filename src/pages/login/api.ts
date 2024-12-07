import axios from "../../axiosConfig"
import { LoginDto } from "../../dto/user/login-dto"

export const login = (data: LoginDto) => {
    return axios.post("/api/users/login", { email: data.email, password: data.password })
}

export const getInforUser = () => {
    return axios.get("/api/users/information")
}