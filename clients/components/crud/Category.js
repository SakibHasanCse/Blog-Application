import Router from 'next/router'
import React, { useState, useEffect } from 'react'
import { getCookie } from '../../actions/auth'

const Categories = () => {
    const [value, setValue] = useState({
        name: '', error: false, success: false, categories: [], removed: false
    })

    const { name, error, success, categories, removed } = value
    const token = getCookie('token')
    const submitHandler = (e) => {
        e.preventDefault()
        console.log('createcategory' + name)

    }
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

    return <React.Fragment>{
        CategoryForm()
    }</React.Fragment>
}

export default Categories