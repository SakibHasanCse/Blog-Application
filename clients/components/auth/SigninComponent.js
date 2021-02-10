
import Router from 'next/router'
import React, { useState, useEffect } from 'react'
import { SigninAPI, authonticate, isAuth } from '../../actions/auth'
const SigninForms = () => {

    const [value, setvalue] = useState({
        email: 'sakib@gmail.com', password: 'aaaaaa', loading: false, error: '', message: '', showForm: true,
    })

    const { email, password, loading, error, message, showForm, } = value

    useEffect(() => {
        isAuth() && Router.push('/')
    }, [])
    const submitHandler = (e) => {
        e.preventDefault()
        setvalue({ ...value, loading: true, error: false, message: '' })
        const user = { email, password }
        SigninAPI(user)
            .then(data => {

                if (data.error) {
                    setvalue({ ...value, error: data.error, loading: false })
                } else {

                    authonticate(data, () => {
                        Router.push('/')

                    })



                }
            })

    }
    const changeHandler = name => e => {
        setvalue({ ...value, error: false, [name]: e.target.value })

    }

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '')
    const showLError = () => (error ? <div className="alert alert-danger">{error}</div> : '')
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '')

    const SigninForm = () => {
        return (
            <form onSubmit={submitHandler}>

                <div className="form-group">
                    <input type="email" value={email} placeholder="Type Your Email" onChange={changeHandler('email')} className="form-control" />
                </div>
                <div className="form-group">
                    <input type="password" value={password} placeholder="Type Your Password" onChange={changeHandler('password')} className="form-control" />
                </div>
                <div>
                    <button className="btn btn-primary">Signin</button>
                </div>

            </form>
        )
    }
    return (
        <React.Fragment>
            {showLoading()}
            {showLError()}
            {showMessage()}
            {showForm && SigninForm()}
        </React.Fragment>
    )
}

export default SigninForms