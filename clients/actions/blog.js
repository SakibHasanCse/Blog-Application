import fetch from 'isomorphic-fetch'
import { API } from '../config'

export const CreateBlog = async (token, blog) => {


    return fetch(`${API}/blog`, {
        method: 'POST',
        headers: {

            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then((response) => {

            return response.json()
        })
        .catch(err => console.log(err))
}