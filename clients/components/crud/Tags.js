
import React, { useState, useEffect } from 'react'
import { getCookie } from '../../actions/auth'
import { CreateCategory } from '../../actions/category'

const Categories = () => {
    const [value, setValue] = useState({
        name: '', error: false, success: false, categories: [], removed: false
    })

    const { name, error, success, categories, removed } = value

    const token = getCookie('token')
    const submitHandler = async (e) => {
        e.preventDefault()
        await CreateCategory(token, name).then(data => {
            if (data.error) {
                setValue({ ...value, success: false, message: data.error, error: true, removed: '' })

            } else {
                setValue({ ...value, success: true, message: data.message, error: fale, removed: true })
            }
        })

    }
    const showError = error ? <div className="alert alert-danger">{error}</div> : ''
    const showMessage = error ? <div className="alert alert-info">{message}</div> : ''


    const handleChange = (e) => {
        setValue({ ...value, name: e.target.value, error: false, success: false, removed: '' })
    }
    const CategoryForm = () => (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <lable className="text-muted">Name</lable>
                <input type="text" onChange={handleChange} value={name} className="form-control" />
            </div>
            <button className="btn btn-primary" type="success">Create</button>
        </form>
    )

    return (

        <React.Fragment>
            {  showError()}
            {  showMessage()}
            {  CategoryForm()}

        </React.Fragment>
    )
}

export default Categories