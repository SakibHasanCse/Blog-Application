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



const UpdateBlog = () => {
    return (
        <div>Update Blog</div>
    )
}
export default UpdateBlog