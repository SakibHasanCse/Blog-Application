import fetch from 'isomorphic-fetch'
import { API } from '../config'

export const getUserProfilewithblog = (username) => {

    return fetch(`${API}/profile/${username}`, {
            method: 'GET',
            headers: { Accept: 'application/json' }
        })
        .then((response) => {
            return response.json()
        }).catch(err => {
            console.log(err)
        })
}

export const getUserProfile = (token) => {
    return fetch(`${API}/user/profile `, { method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }).then((response) => {
        return response.json()
    }).catch(err => {
        console.log(err)
    })
}
export const updateUserProfile = (token, username) => {
    return fetch(`${API}/user/profile/${username} `, { method: 'PUT', headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }).then((response) => {
        return response.json()
    }).catch(err => {
        console.log(err)
    })
}