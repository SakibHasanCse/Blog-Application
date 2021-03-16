import React, { useState, useEffect } from 'react'
import { SingleBlogAPI, UpdateBlogAPI } from '../../actions/blog.js'
import { isAuth, getCookie } from '../../actions/auth'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'
import { CategoryList } from '../../actions/category'
import { TagsList } from '../../actions/tags'
import Link from 'next/link'


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';
import { quillformats, Quillmodules } from '../../helpers/quill.js'




const UpdateBlog = ({ router }) => {


    const [body, setBody] = useState('')
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [checked, setChecked] = useState([])
    const [checkedTags, setCheckedTags] = useState([])

    const [values, setValues] = useState({
        success: '', error: '', formData: '', title: '',
    })
    const { success, error, formData, title, } = values
    var token = getCookie('token')



    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
        initBlog()
        initTags()
        initCategories()
    }, [router])
    const readyBlog = (e) => {
        e.preventDefault()
        UpdateBlogAPI(token, formData, router.query.slug).then(data => {
            console.log(data)
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, title: '', error: '', success: `Blog  titled "${data.title}" Updated Successfully`, body: '' })
                if (isAuth() && isAuth().role == 1) {
                    Router.replace(`/admin/crud/${router.query.slug}`)

                } else if (isAuth() && isAuth().role == 0) {
                    Router.replace(`/user/crud/${router.query.slug}`)

                }
            }
        })



    }

    const ShowError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>

    )
    const ShowMessage = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>{success}</div>

    )



    const changeHandler = name => e => {
        var value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value, formData, error: '' })
    }
    const initCategories = () => {
        CategoryList().then((data) => {
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
    const initBlog = () => {
        if (router.query.slug) {

            SingleBlogAPI(router.query.slug).then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: '' })
                }
                else {
                    setValues({ ...values, title: data.title })
                    setBody(data.body)
                    setCategoriesArray(data.categories)
                    setTagsArray(data.tags)
                }
            })
        }

    }

    const setCategoriesArray = (blogCategories) => {
        var ca = []
        blogCategories.map((category, i) => (
            ca.push(category._id)
        ))
        setChecked(ca)

    }
    const setTagsArray = (blogTags) => {
        var ca = []
        blogTags.map((t, i) => (
            ca.push(t._id)
        ))
        setCheckedTags(ca)

    }
    const handleChangeChaked = (e) => () => {
        setValues({ ...values, error: '' })
        const CheckedCategory = checked.indexOf(e)

        const all = [...checked]
        if (CheckedCategory === -1) {
            all.push(e)
        } else {
            all.splice(CheckedCategory, 1)
        }
        setChecked(all)
        formData.set('categories', all)


    }
    const handleChangeCheckedTags = (e) => () => {
        setValues({ ...values, error: '' })
        const CheckedTags = checkedTags.indexOf(e)
        var all = [...checkedTags]
        if (CheckedTags === -1) {
            all.push(e)

        } else {
            all.splice(CheckedTags, 1)
        }
        setCheckedTags(all)

        formData.set('tags', all)
    }

    const selectedCategory = (e) => {
        var result = checked.indexOf(e)
        if (result !== -1) {
            return true
        } else {
            return false
        }

    }
    const selectedTags = (e) => {
        var result = checkedTags.indexOf(e)
        if (result !== -1) {
            return true
        } else {
            return false
        }
    }

    const showCategories = () => {
        return (
            categories && categories.map((category, i) => (
                <li key={i} className="list-unstyled">
                    <input type="checkbox" checked={selectedCategory(category._id)} onChange={handleChangeChaked(category._id)} className="mr-2" />
                    <label htmlFor="" className="form-check-label">{category.name}</label>


                </li>
            ))
        )

    }
    const showTags = () => {
        return (
            tags && tags.map((tag, i) => (
                <li className="list-unstyled">
                    <input type="checkbox" checked={selectedTags(tag._id)} onChange={handleChangeCheckedTags(tag._id)} className="mr-2" />
                    <label htmlFor="" className="form-check-label">{tag.name}</label>
                </li>
            ))
        )
    }

    const BlogFrom = () => {
        return (
            <form onSubmit={readyBlog}>
                <div className="form-group">
                    <lable className="text-muted">Name</lable>
                    <input type="text" onChange={changeHandler('title')} value={title} className="form-control" />
                </div>
                <div className="form-group">
                    <ReactQuill modules={Quillmodules} formats={quillformats} value={body} placeholder="write something  amazing on your blog..." />
                </div>
                <button className="btn btn-primary">Update</button>
            </form>
        )
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    {BlogFrom()}
                    <div className="pt-3">
                        {ShowError()}
                        {ShowMessage()}
                    </div>
                </div>
                <div className="col-md-4">
                    <div>
                        <div className="form-group">
                            <small>Max size : 1 Mb</small>
                            <br />
                            <label className="btn btn-outline-info"> Upload Feature Image
                            <input type="file" onChange={changeHandler('photo')} accept="image/*" hidden />
                            </label>

                        </div>
                        <div>
                            <h5>Categories</h5>
                            <ul style={{ maxHeight: '150px', overflowY: 'scroll' }}>
                                {showCategories()}
                            </ul>
                        </div>
                        <div>
                            <h5>Tags</h5>
                            <ul style={{ maxHeight: '150px', overflowY: 'scroll' }} >
                                {showTags()}

                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(UpdateBlog)