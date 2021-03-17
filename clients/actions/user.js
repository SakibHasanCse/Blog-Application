import fetch from 'isomorphic-fetch'
import { API } from '../config'
export const getUserProfilewithblog = async(username) => {
    await fetch(`${API}/profile/${username}`, { method: 'GET' })
        .then((response) => {

            return response.json()
        }).catch(err => {
            console.log(err)
        })
}