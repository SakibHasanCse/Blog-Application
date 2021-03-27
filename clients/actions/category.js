import fetch from 'isomorphic-fetch'
import { API } from '../config'
import { HandlesAuthToken } from './auth'

export const CreateCategory = async(token, Category) => {


    return fetch(`${API}/category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(Category)
        })
        .then((response) => {
            HandlesAuthToken(response)
            return response.json()
        })
        .catch(err => console.log(err))
}

export const CategoryList = async() => {

    return fetch(`${API}/categorys`, {
            method: 'GET',
        })
        .then((response) => {

            return response.json()
        })
        .catch(err => console.log(err))
}


export const SingleCategory = async(slug) => {

    return fetch(`${API}/category/${slug}`, {
            method: 'GET',

        })
        .then((response) => {

            return response.json()
        })
        .catch(err => console.log(err))
}



export const DeleteCategory = async(slug, token) => {

    return fetch(`${API}/category/${slug}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }

        })
        .then((response) => {
            HandlesAuthToken(response)
            return response.json()
        })
        .catch(err => console.log(err))
}