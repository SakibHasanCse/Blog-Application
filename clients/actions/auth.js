import fetch from 'isomorphic-fetch'
import { API } from '../config'
import cookie from 'js-cookie'
import Router from 'next/router'

export const SignupAPI = async(user) => {
    console.log(JSON.stringify(user))
    return fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then((response) => {
            console.log(response)
            return response.json()
        })
        .catch(err => console.log(err))
}

export const SigninAPI = async(user) => {
    console.log(JSON.stringify(user))
    return fetch(`${API}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then((response) => {
            console.log(response)
            return response.json()
        })
        .catch(err => console.log(err))
}





export const signout = (next) => {
    removeCookie('token')
    removeLocalStorage('user')
    next()
    return fetch(`${API}/signout`, { Method: 'GET' })
        .then((response) => { console.log(response) }).catch(err => console.log(err))
}



export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, () => {
            expires: 1
        })
    }
}
export const removeCookie = (key) => {
    if (process.browser) {
        cookie.remove(key)
    }
}
export const getCookie = (key) => {
    if (process.browser) {
        return cookie.get(key)
    }
}


export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = (key) => {
    if (process.browser) {
        localStorage.removeItem(key)
    }
}

export const authonticate = (data, next) => {
    setCookie('token', data.token)
    setLocalStorage('user', data.user)
    next()
}

export const isAuth = () => {
    if (process.browser) {
        const cookisCheck = getCookie('token')
        if (cookisCheck) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        } else {
            return false

        }
    }
}

export const UpdateUser = (user, next) => {
    if (process.browser) {
        if (localStorage.getItem('user')) {
            let auth = JSON.parse(localStorage.getItem('user'))
            auth = user
            localStorage.setItem('user', JSON.stringify(auth))
            next()
        }
    }
}

export const HandlesAuthToken = (response) => {
    if (response.status == 401) {
        signout(() => {
            Router.push({
                pathname: '/signin',
                query: {
                    message: 'Your Session is Expired , Please sign in again'
                }
            })
        })

    }
}