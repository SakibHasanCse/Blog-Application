import React, { useState, useEffect } from 'react'
import { CreateBlog } from '../../actions/blog.js'
import { isAuth, getCookie } from '../../actions/auth'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'
import { CategoryList } from '../../actions/category.js'
import { TagsList } from '../../actions/tags.js'
import Link from 'next/link'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';
import { quillformats, Quillmodules } from '../../helpers/quill.js'


const CreateBlogs = ({ router }) => {
    const blogFromLS = () => {
        if (typeof window === 'undefined') {
            return false
        }
        if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'))
        } else {
            false
        }
    }


    const [body, setBody] = useState(blogFromLS())
    const [values, setValues] = useState({
        success: '', error: '', sizeError: '', title: '', formData: '', hidePublishButton: false
    })
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    const { success, error, sizeError, title, formData, hidePublishButton } = values
    const [checked, setChecked] = useState([]) //category checked
    const [checkedTags, setCheckedTags] = useState([]) //Tags checked
    const token = getCookie('token')

    const readyBlog = (e) => {
        e.preventDefault()
        console.log('readyBlog')
        CreateBlog(token, formData).then((data) => {
            console.log(data)
            if (data.error) {
                setValues({ ...values, error: data.error, success: '' })
            } else {
                setValues({ ...values, title: '', error: '', success: `A New BLog titled ${data.title} is Created` })
                setBody('')
                setCategories([])
                setTags([])
            }
        })
    }

    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
        initCategories()
        initTags()

    }, [router])


    const initCategories = () => {
        CategoryList()
            .then((data) => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setCategories(data)
                }
            })
    }
    const initTags = () => {
        TagsList().then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setTags(data)
            }
        })
    }

    const changeHandler = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value)
        setValues({ ...values, [name]: value, formData, error: '', success: '' })
    }
    const handleBody = e => {
        setBody(e)
        formData.set('body', e)
        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e))
        }

    }

    const handleChangeChaked = c => () => {
        setValues({ ...values, error: '', })
        const checkedCategory = checked.indexOf(c)
        const all = [...checked]
        if (checkedCategory === -1) {
            all.push(c)
        } else {
            all.splice(checkedCategory, 1)
        }
        console.log(all)
        setChecked(all)
        formData.set('categories', all)
    }
    const handleChangeChakedTags = c => () => {
        setValues({ ...values, error: '', })
        const clickedTags = checkedTags.indexOf(c)
        const all = [...checkedTags]
        if (clickedTags === -1) {
            all.push(c)
        } else {
            all.splice(clickedTags, 1)
        }
        console.log(all)
        setCheckedTags(all)
        formData.set('tags', all)
    }



    const showCategories = () => {
        return (
            categories && categories.map((category, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleChangeChaked(category._id)} type="checkbox" className="mr-2" />
                    <lable className="form-check-lable">{category.name}</lable>

                </li>
            ))
        )
    }

    const showTags = () => {
        return (
            tags && tags.map((tag, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleChangeChakedTags(tag._id)} type="checkbox" className="mr-2" />
                    <lable className="form-check-lable">{tag.name}</lable>

                </li>
            ))
        )
    }
    const ErrorMessage = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
    )
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>{success}</div>
    )

    const BlogFrom = () => {
        return (
            <form onSubmit={readyBlog}>
                <div className="form-group">
                    <lable className="text-muted">Name</lable>
                    <input type="text" onChange={changeHandler('title')} value={title} className="form-control" />
                </div>
                <div className="form-group">
                    <ReactQuill modules={Quillmodules} formats={quillformats} placeholder="write something  amazing ..." value={body} onChange={handleBody} />
                </div>
                <button className="btn btn-primary">Publish</button>
            </form>
        )
    }
    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-8">
                    <div>
                        {ErrorMessage()}
                        {showSuccess()}
                    </div>

                    {BlogFrom()}
                </div>
                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <small >Max size :1mb</small>
                            <br />
                            <label className="btn btn-outline-info">
                                Upload Feature Image
                                    <input type="file" onChange={changeHandler('photo')} accept="image/*" hidden />
                            </label>
                        </div>
                    </div>
                    <div>
                        <h5>Category</h5>
                        <hr />
                        <ul style={{ maxHeight: '150px', overflowY: 'scroll' }}>{showCategories()}</ul>
                    </div>


                    <div>
                        <h5>Tags </h5>
                        <hr />
                        <ul style={{ maxHeight: '150px', overflowY: 'scroll' }}>  {showTags()}</ul>
                    </div>


                </div>
            </div>


        </div>

    )
}

export default withRouter(CreateBlogs)