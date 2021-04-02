import React, { useState, useEffect } from 'react'
import { EmailContactForm } from '../../actions/form'
const ContactForm = ({ authorEmail }) => {


    const [values, setValues] = useState({
        name: '', email: '', message: '', success: false, error: false, buttonText: 'Message send',
    })
    const { name, email, message, success, error, buttonText } = values
    const submitHandler = (e) => {
        e.preventDefault()
        setValues({ ...values, buttonText: 'Sending...' })
        EmailContactForm({ authorEmail, name, email, message }).then((response) => {
            if (response.error) {
                setValues({ ...values, success: false, error: response.error, buttonText: 'Message send' })
            } else {
                setValues({ ...values, name: '', error: '', success: true, email: '', message: '', buttonText: 'Sent' })
            }
        })
    }
    const errorMessage = () => {
        return (
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
        )
    }
    const successMessage = () => success && (<div className="alert alert-success">Thanks you for contacting us.</div>)
    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value, error: false, success: false, buttonText: 'Message send' })
    }

    const contactFormShow = () => {
        return (
            <form onSubmit={submitHandler} className="pb-5">
                <div className="form-group">
                    <label htmlFor="" className="lead">Message</label>
                    <textarea value={message} className="form-control" onChange={handleChange('message')} required cols="30" rows="10"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="lead">Name</label>
                    <input type="text" value={name} onChange={handleChange('name')} className="form-control" />

                </div>
                <div className="form-group">
                    <label htmlFor="" className="lead">Email</label>
                    <input type="email" value={email} onChange={handleChange('email')} className="form-control" />
                </div>
                <button className="btn btn-primary">{buttonText}</button>
            </form>
        )
    }
    return (
        <React.Fragment>
            <div className="pt-2 pb-3">
                {successMessage()}
                {errorMessage()}
            </div>
            {contactFormShow()}


        </React.Fragment>
    )
}
export default ContactForm