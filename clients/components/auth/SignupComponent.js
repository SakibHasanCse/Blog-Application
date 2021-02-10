
import React, { useState, useEffect } from 'react'
import { SignupAPI, isAuth } from '../../actions/auth'
import Router from 'next/router'
const SignupForm = () => {

    const [value, setvalue] = useState({
        name: 'Sakib Hasan', email: 'sakib@gmail.com', password: 'aaaaaa', loading: false, error: '', message: '', showForm: true,
    })

    const { name, email, password, loading, error, message, showForm, } = value

    useEffect(() => {
        isAuth() && Router.push('/')
    }, [])
    const submitHandler = (e) => {
        e.preventDefault()
        setvalue({ ...value, loading: true, error: false, message: '' })
        const user = { name, email, password }
        SignupAPI(user)
            .then(data => {

                if (data.error) {
                    setvalue({ ...value, error: data.error, loading: false })
                } else {

                    setvalue({
                        ...value,
                        name: '', email: '', password: '',
                        loading: false,
                        error: '',
                        showForm: false,
                        message: data.message
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

    const SignForm = () => {
        return (
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <input type="text" value={name} placeholder="Type Your Name" onChange={changeHandler('name')} className="form-control" />
                </div>
                <div className="form-group">
                    <input type="email" value={email} placeholder="Type Your Email" onChange={changeHandler('email')} className="form-control" />
                </div>
                <div className="form-group">
                    <input type="password" value={password} placeholder="Type Your Password" onChange={changeHandler('password')} className="form-control" />
                </div>
                <div>
                    <button className="btn btn-primary">Signup</button>
                </div>

            </form>
        )
    }
    return (
        <React.Fragment>
            {showLoading()}
            {showLError()}
            {showMessage()}
            {showForm && SignForm()}
        </React.Fragment>
    )
}

export default SignupForm