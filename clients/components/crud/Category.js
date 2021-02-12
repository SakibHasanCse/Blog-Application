
import React, { useState, useEffect } from 'react'
import { getCookie } from '../../actions/auth'
import { CreateCategory, CategoryList, DeleteCategory } from '../../actions/category'

const Categories = () => {
    const [value, setValue] = useState({
        name: '', error: false, success: false, categories: [], removed: false, reload: false
    })

    const { name, error, success, categories, removed, reload } = value

    const token = getCookie('token')

    useEffect(() => {
        loadCategory()
    }, [reload])


    const loadCategory = async () => {
        await CategoryList().then((data) => {
            if (data.error) {
                console.log(data.error)

            } else {
                setValue({ ...value, categories: data })
            }
        })
    }

    const ShowCategory = () => {
        return categories.map((category, i) => {
            return <button onDoubleClick={() => DeleteConfram(category.slug)}
                title="Double Click to delete category"
                key={i}
                className="btn btn-outline-primary mr-1 ml-1 mt-3 ">{category.name}</button>
        })
    }

    const DeleteConfram = (slug) => {
        const anser = window.confirm('Are you sure you want to delete')
        if (anser) {
            deleteCat(slug)
        }

    }
    const deleteCat = (slug) => {
        DeleteCategory(slug, token)
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setValue({ ...value, error: false, reload: !reload, removed: !removed })
                }
            })

    }

    const submitHandler = (e) => {
        e.preventDefault()
        CreateCategory(token, { name }).then(data => {
            if (data.error) {
                setValue({ ...value, success: false, error: true, })
            } else {
                setValue({ ...value, success: true, name: '', reload: !reload, removed: '', message: data.message, error: false, })
            }
        })

    }

    const showError = () => error ? <div className="text-danger">Category already exists</div> : ''
    const showSuccess = () => success ? <div className="text-info">Category is created successfully</div> : ''
    const showRemoved = () => removed ? <div className="text-danger">Category is removed</div> : ''

    const mouseMoveHandler = (e) => {
        setValue({ ...value, error: false, success: false, removed: '' })

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

    return (

        <React.Fragment>
            {  showError()}
            {  showSuccess()}
            {  showRemoved()}
            <div onMouseMove={mouseMoveHandler}>
                {CategoryForm()}
                {ShowCategory()}
            </div>

        </React.Fragment>
    )
}

export default Categories