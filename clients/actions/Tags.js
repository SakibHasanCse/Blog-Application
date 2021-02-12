import fetch from 'isomorphic-fetch'
import { API } from '../config'

export const CreateTags = async (token, tags) => {


    return fetch(`${API}/tag`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tags)
    })
        .then((response) => {

            return response.json()
        })
        .catch(err => console.log(err))
}

export const TagsList = async () => {

    return fetch(`${API}/tags`, {
        method: 'GET',
    })
        .then((response) => {

            return response.json()
        })
        .catch(err => console.log(err))
}


export const SingleTags = async (slug) => {

    return fetch(`${API}/tag/${slug}`, {
        method: 'POST',

    })
        .then((response) => {

            return response.json()
        })
        .catch(err => console.log(err))
}



export const DeleteTags = async (slug, token) => {

    return fetch(`${API}/tag/${slug}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }

    })
        .then((response) => {

            return response.json()
        })
        .catch(err => console.log(err))
}
