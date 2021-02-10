import fetch from 'isomorphic-fetch'
import { API } from '../config'

export const SignupAPI = async (user) => {
    console.log(JSON.stringify(user))
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then(response => { return response.json() })
        .catch(err => console.log(err))
}