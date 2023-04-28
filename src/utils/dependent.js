import axios from "axios"
// import { getToken } from "./users_service"

export async function login(data) {
  console.log(data)
  return axios.post(`${process.env.REACT_APP_PORT}/login/dependent`, data).then(res => res.data)
}

export async function signup(input) {
  console.log((input))
  return axios.post(`${process.env.REACT_APP_PORT}/signup/dependent`, input, {
    headers: {
      "Content-Type": "application/json",
    }
  }).then(res => res.data)}