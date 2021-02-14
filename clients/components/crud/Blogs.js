import React, { useState, useEffect } from 'react'
import { CreateBlog } from '../../actions/blog.js'
import { isAuth, getCookie } from '../../actions/auth'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'
import { CategoryList } from '../../actions/category'
import { TagsList } from '../../actions/tags'
import Link from 'next/link'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';


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


    const [values, setValues] = useState({
        success: '', error: '', sizeError: '', title: '', formData: '', hidePublishButton: false
    })
    const [body, setBody] = useState(blogFromLS())
    const { success, error, sizeError, title, formData, hidePublishButton } = values

    const readyBlog = (e) => {
        e.preventDefault()
        console.log('readyBlog')
    }

    useEffect(() => {
        setValues({ ...values, formData: new FormData() })

    }, [router])

    const changeHandler = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value)
        setValues({ ...values, [name]: value, formData, error: '' })
    }
    const handleBody = e => {
        setBody(e)
        formData.set('body', e)
        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e))
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
                    <ReactQuill modules={CreateBlog.modules} formats={CreateBlog.formats} placeholder="write something  amazing ..." value={body} onChange={handleBody} />
                </div>
            </form>
        )
    }
    return (
        <React.Fragment>
            {BlogFrom()}
            <hr />
            {JSON.stringify(title)}
            <hr />
            {JSON.stringify(body)}
        </React.Fragment>

    )
}

CreateBlog.modules = {
    toolbar: [
        [{ header: '1 ' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']

    ]

}
CreateBlog.formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'link', 'image', 'video', 'code-block'
]
export default withRouter(CreateBlogs)