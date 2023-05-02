import axios from "axios"
// import { getToken } from "./users_service"

export async function login(data) {
  // console.log(data)
  return axios.post(`${process.env.REACT_APP_PORT}/owner/login`, data).then(res => res.data)
}

export async function signup(input) {

  return axios.post(`${process.env.REACT_APP_PORT}/owner/signup`, input, {
    headers: {
      "Content-Type": "application/json",
    }
  }).then(res => res.data)}

export function getDependents (id) {
    // console.log(id)
    return axios.get(`${process.env.REACT_APP_PORT}/owner/alldependents?id=${id}`).then(res => res.data)
}

export function addNewDependent (input) {

  return axios.put(`${process.env.REACT_APP_PORT}/owner/add/dependent`, input)
              .then(res => res.data)
}

export function deleteDependent (memberDelete) {
// console.log(memberDelete)
  return axios.put(`${process.env.REACT_APP_PORT}/owner/delete/dependent`, memberDelete)
              .then(res => res.data)
}

export function updateDependent (data) {
  // console.log(data)
    return axios.put(`${process.env.REACT_APP_PORT}/owner/update/dependent`, data)
                .then(res => res.data)
  }

export function getBusinessName (id) {
  // console.log(id)
  return axios.get(`${process.env.REACT_APP_PORT}/owner?id=${id}`)
                .then(res => {
                  // console.log(res.data)
                  return res.data})
}