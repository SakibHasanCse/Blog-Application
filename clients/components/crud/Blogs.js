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
    console.log(JSON.stringify(router))
    const BlogFrom = () => {
        return (
            <form action="">
                <div className="form-group">
                    <input type="text" className="form-control" />
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
export default withRouter(CreateBlogs)