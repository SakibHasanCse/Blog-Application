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
    const [values, setValues] = useState({
        success: '', error: '', sizeError: '', title: '', formData: '', hidePublishButton: false
    })
    const { success, error, sizeError, title, formData, hidePublishButton } = values
    const [body, setBody] = useState({})

    const readyBlog = (e) => {
        e.preventDefault()
        console.log('readyBlog')
    }
    const changeHandler = name => e => {
        console.log(e.target.value)
    }
    const handleBody = e => {
        console.log(e)
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