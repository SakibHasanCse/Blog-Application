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
import { quillformats, Quillmodules } from '../../helpers/quill.js'



const UpdateBlog = ({ router }) => {
    const changeHandler = name => e => {
        
    }

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
                    {BlogFrom()}
                </div>
                <div className="col-md-4">
                    show categories
                </div>
            </div>
        </div>
    )
}
export default withRouter(UpdateBlog)