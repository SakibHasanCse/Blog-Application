
import React, { useState, useEffect } from 'react'
import { getCookie } from '../../actions/auth'
import { CreateTags, TagsList, DeleteTags } from '../../actions/Tags'

const Tags = () => {
    const [value, setValue] = useState({
        name: '', error: false, success: false, tags: [], removed: false, reload: false
    })

    const { name, error, success, tags, removed, reload } = value

    const token = getCookie('token')

    useEffect(() => {
        loadTags()
    }, [reload])


    const loadTags = async () => {
        await TagsList().then((data) => {
            if (data.error) {
                console.log(data.error)

            } else {
                setValue({ ...value, tags: data })
            }
        })
    }

    const ShowTags = () => {
        return tags.map((Tags, i) => {
            return <button onDoubleClick={() => DeleteConfram(Tags.slug)}
                title="Double Click to delete Tags"
                key={i}
                className="btn btn-outline-primary mr-1 ml-1 mt-3 ">{Tags.name}</button>
        })
    }

    const DeleteConfram = (slug) => {
        const anser = window.confirm('Are you sure you want to delete')
        if (anser) {
            deleteCat(slug)
        }

    }
    const deleteCat = (slug) => {
        DeleteTags(slug, token)
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
        CreateTags(token, { name }).then(data => {
            if (data.error) {
                setValue({ ...value, success: false, error: true, })
            } else {
                setValue({ ...value, success: true, name: '', reload: !reload, removed: '', message: data.message, error: false, })
            }
        })

    }

    const showError = () => error ? <div className="text-danger">Tags already exists</div> : ''
    const showSuccess = () => success ? <div className="text-info">Tags is created successfully</div> : ''
    const showRemoved = () => removed ? <div className="text-danger">Tags is removed</div> : ''

    const mouseMoveHandler = (e) => {
        setValue({ ...value, error: false, success: false, removed: '' })

    }

    const handleChange = (e) => {
        setValue({ ...value, name: e.target.value, error: false, success: false, removed: '' })
    }
    const TagsForm = () => (
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
                {TagsForm()}
                {ShowTags()}
            </div>

        </React.Fragment>
    )
}

export default Tags