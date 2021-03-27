import fetch from 'isomorphic-fetch'
import { API } from '../config'
import queryString from 'query-string'
import { isAuth } from './auth'
export const CreateBlog = async(token, blog) => {
    let blogEndPoint;

    if (isAuth() && isAuth().role === 1) {
        blogEndPoint = `${API}/blog`

    } else if (isAuth() && isAuth().role === 0) {
        blogEndPoint = `${API}/user/blog`

    }
    return fetch(`${blogEndPoint}`, {
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

export const UpdateBlogAPI = async(token, data, slug) => {
    let blogEndPoint;

    if (isAuth() && isAuth().role === 1) {
        blogEndPoint = `${API}/blog/${slug}`

    } else if (isAuth() && isAuth().role === 0) {
        blogEndPoint = `${API}/user/blog/${slug}`

    }
    return fetch(`${blogEndPoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`

        },
        body: data,

    }).then((response) => {
        return response.json()
    }).catch(err => console.log(err))
}

export const ListBlogwithCategoryAndTags = async(skip, limit) => {
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

export const RelateBlogs = (blog) => {
    return fetch(`${API}/blogs/releted`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(blog) }).then((response) => {
        return response.json()
    }).catch(err => console.log(err))
}

export const searchBLog = (params) => {
    var query = queryString.stringify(params)
    console.log('query', query)
    console.log('params', params)
    return fetch(`${API}/blogs/search?${query}`, {
        method: 'GET'
    }).then((response) => {
        return response.json()
    }).catch(err => console.log(err))
}
export const allListAPI = async(username) => {
    var ApiEndpoint;
    if (username) {
        ApiEndpoint = `${API}/${username}/blogs`
    } else {
        ApiEndpoint = `${API}/blogs`
    }
    return fetch(`${ApiEndpoint}`, { method: 'GET' })
        .then((response) => {

            return response.json()
        }).catch(err => {
            console.log(err)
        })
}

export const deleteBlog = async(slug, token) => {
    let blogEndPoint;

    if (isAuth() && isAuth().role === 1) {
        blogEndPoint = `${API}/blog/${slug}`

    } else if (isAuth() && isAuth().role === 0) {
        blogEndPoint = `${API}/user/blog/${slug}`

    }

    return fetch(`${blogEndPoint}`, {
            method: 'DELETE',
            headers: {

                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {

            return response.json()
        }).catch(err => {
            console.log(err)
        })
}