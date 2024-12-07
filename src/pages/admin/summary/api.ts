import axios from "../../../axiosConfig";

export const getTotalUsers = () => {
    return axios.get("/api/users")
}