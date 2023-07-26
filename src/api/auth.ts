import axios from "axios";

const API = "http://localhost:3000/auth";

export const changePasswordRequest = async (password: {password: string}) => await axios.post(`${API}/register`, password);