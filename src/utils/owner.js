import axios from "axios"
// import { getToken } from "./users_service"

export async function login(data) {
  console.log(data)
  return axios.post(`${process.env.REACT_APP_PORT}/login/owner`, data).then(res => res.data)
}

export async function signup(input) {
  console.log((input))
  return axios.post(`${process.env.REACT_APP_PORT}/signup/owner`, input, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${getToken()}`,
    }
  }).then(res => res.data)}