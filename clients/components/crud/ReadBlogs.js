import React, { useState, useEffect } from 'react'
import { allListAPI, deleteBlog } from '../../actions/blog'
import moment from 'moment'
import { getCookie, isAuth } from '../../actions/auth'
import Link from 'next/link'


const ReadAllBlog = ({ username }) => {
    const [blogs, setBlog] = useState([])
    const [message, setMessage] = useState({})
    const token = getCookie('token')

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        allListAPI(username).then((data) => {

            if (data.error) {
                console.log(data.error)
            } else {
                setBlog(data)
            }
        })
    }
    const deleteBlogbyslug = (slug) => {
        deleteBlog(slug, token).then((data) => {
            if (data.error) {
                setMessage(data.error)
            } else {
                setMessage(data.message)
                loadProducts()
            }
        })
    }
    const DeleteBlog = (slug) => {

        const anser = window.confirm('Are you sure you want to delete')
        if (anser) {
            deleteBlogbyslug(slug)
        }


    }
    const UpdateBlog = (slug) => {
        if (isAuth() && isAuth().role == 0) {
            return (
                <Link href={`/user/crud/${slug}`}>
                    <a className="btn btn-info btn-sm" >Update</a>
                </Link>
            )
        } else if (isAuth() && isAuth().role === 1) {
            return <Link href={`/admin/crud/${slug}`}>
                <a className="btn btn-info ml-1 btn-sm" >Update</a>
            </Link>

        }

    }


    const showBlog = () => {
        return blogs && blogs.map((blog, i) => (
            <div key={i} className="pb-5 ">
                <h3 >{blog.title}</h3>
                <p className="mark">Written by <Link href={`/profile/${blog.postedBy.username}`}>
                    <a>{blog.postedBy.name}</a>

                </Link> | Published on {moment(blog.updatedAt).fromNow()}</p>
                <button className="btn btn-sm btn-danger mr-2" onClick={() => DeleteBlog(blog.slug)}>Delete</button>
                {UpdateBlog(blog.slug)}

                <hr />
            </div>
        ))
    }
    console.log(message)

    return (
        <React.Fragment>
            <div className="container">
                {/* {message && <div className="alert alert-danger">{message}</div>} */}
                <div className="row">
                    {showBlog()}
                </div>
            </div>
        </React.Fragment>
    )


}
export default ReadAllBlog