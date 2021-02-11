
import React, { useState, useEffect } from 'react'
import { getCookie } from '../../actions/auth'
import { CreateCategory, CategoryList, DeleteCategory } from '../../actions/category'

const Categories = () => {
    const [value, setValue] = useState({
        name: '', error: false, success: false, categories: [], removed: false
    })

    const { name, error, success, categories, removed } = value

    const token = getCookie('token')

    useEffect(() => {
        loadCategory()
    }, [])


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
            return <button onDoubleClick={() => DeleteConfram(category.slug)} title="Double Click to delete category" key={i} className="btn btn-outline-primary mr-1 ml-1 mt-3 ">{category.name}</button>
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
                    setValue({ ...value, error: false })
                }
            })

    }

    const submitHandler = (e) => {
        e.preventDefault()

        CreateCategory(token, { name }).then(data => {
            if (data.error) {
                setValue({ ...value, success: false, message: data.error, error: true, removed: '' })

            } else {
                setValue({ ...value, success: true, name: '', message: data.message, error: false, removed: true, })
            }
        })

    }
    // const showError = () => error ? (<div className="alert alert-danger">{error}</div>) : ''
    // const showMessage = () => error ? (<div className="alert alert-info">{message}</div>) : ''


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
            {/* {  showError()} */}
            {/* {  showMessage()} */}
            {  CategoryForm()}
            <div>
                {ShowCategory()}
            </div>

        </React.Fragment>
    )
}

export default Categories