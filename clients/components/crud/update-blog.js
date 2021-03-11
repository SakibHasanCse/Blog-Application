import React, { useState, useEffect } from 'react'
import { SingleBlogAPI } from '../../actions/blog.js'
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
    const [values, setValues] = useState({
        success: '', error: '', formData: '', title: '',
    })
    const { success, error, formData, title, } = values




    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
        initBlog()
    }, [router])
    const readyBlog = (e) => {
        e.preventDefault()


    }
    const changeBody = (e) => {
        setBody(e)
        formData.set('body', e)
    }
    const editBlog = () => {

    }

    const changeHandler = name => e => {
        var value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value, formData, error: '' })
    }

    const initBlog = () => {
        if (router.query.slug) {

            SingleBlogAPI(router.query.slug).then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    setValues({ ...values, title: data.title })
                    setBody(data.body)
                }
            })
        }

    }

    const BlogFrom = () => {
        return (
            <form onSubmit={readyBlog}>
                <div className="form-group">
                    <lable className="text-muted">Name</lable>
                    <input type="text" onChange={changeHandler('title')} value={title} className="form-control" />
                </div>
                <div className="form-group">
                    <ReactQuill modules={Quillmodules} formats={quillformats} value={body} placeholder="write something  amazing ..." />
                </div>
                <button className="btn btn-primary">Publish</button>
            </form>
        )
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    {BlogFrom()}
                </div>
                <div className="col-md-4">

                </div>
            </div>
        </div>
    )
}
export default withRouter(UpdateBlog)