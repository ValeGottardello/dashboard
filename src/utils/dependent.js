import axios from "axios"
// import { getToken } from "./users_service"

export async function login(data) {
  return axios.post(`${process.env.REACT_APP_PORT}/dependent/login`, data).then(res => res.data)
}

export async function signup(input) {
  console.log((input))
  return axios.post(`${process.env.REACT_APP_PORT}/dependent/signup`, input, {
    headers: {
      "Content-Type": "application/json",
    }
  }).then(res => res.data)}

export function addHours(data) {
  console.log(data)
  return axios.put(`${process.env.REACT_APP_PORT}/dependent/addhours`, data).then(res => res.data)
}

export function getTasks (id) {
  return axios.get(`${process.env.REACT_APP_PORT}/tasks/list?id=${id}`).then(res => res.data)
}

export function checkDone (id) {
  return axios.put(`${process.env.REACT_APP_PORT}/tasks/done?id=${id}`).then(res => res.data)
}

export function addNewTask (data) {
  console.log(data)
  return axios.post(`${process.env.REACT_APP_PORT}/tasks/new`, data, 
  {headers: {
      "Content-Type": "application/json",
    }}).then(res => res.data)
}
export function deleteTask (id) {

  return axios.delete(`${process.env.REACT_APP_PORT}/tasks/delete?id=${id}`).then(res => res.data)
}
export function getAllTasks (id) {
  return axios.get(`${process.env.REACT_APP_PORT}/tasks/all?id=${id}`).then(res => res.data)
}
