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


export const ListBlogwithCategoryAndTags = async (skip, limit) => {

    const data = { skip: skip, limit: limit }
    return fetch(`${API}/blogs-categories-tags`, {
        method: 'POST',
        headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)

    })
        .then((response) => {

            return response.json()
        })
        .catch(err => console.log(err))
}
export const SingleBlogAPI = (slug) => {
    return fetch(`${API}/blog/${slug}`, { method: 'GET' }).then((response) => {
        return response.json()
    }).catch(err => console.log(err))

}