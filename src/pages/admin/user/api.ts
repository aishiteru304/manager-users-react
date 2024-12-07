import axios from "../../../axiosConfig";
import { CreateUserDto } from "../../../dto/user/create-user-dto";

export const getAllUsers = () => {
    return axios.get("/api/users")
}

export const createUser = (data: CreateUserDto) => {
    return axios.post("/api/users/register", { fullName: data.fullName, email: data.email, password: data.password })
}

export const deleteUser = (id: string) => {
    return axios.delete(`/api/users/${id}`)
}