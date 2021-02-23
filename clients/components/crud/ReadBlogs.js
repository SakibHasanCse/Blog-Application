import React, { useState, useEffect } from 'react'
import { allListAPI, deleteBlog } from '../../actions/blog'
import moment from 'moment'
import { getCookie } from '../../actions/auth'



const ReadAllBlog = () => {
    const [blogs, setBlog] = useState([])
    const [message, setMessage] = useState({})
    const token = getCookie('token')


    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        allListAPI().then((data) => {
            console.log(data)
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
    const showMessage = () => (
        <div className="alert alert-danger" style={{ display: message ? '' : 'none' }}>{message}</div>
    )

    const showBlog = () => {
        return blogs && blogs.map((blog, i) => (
            <div key={i} className="pb-5 ">
                <h3 >{blog.title}</h3>
                <p className="mark">Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}</p>
                <button className="btn btn-sm btn-danger" onClick={() => DeleteBlog(blog.slug)}>Delete</button>
                <hr />
            </div>
        ))
    }
    console.log(message)

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    {showMessage()}
                    {showBlog()}
                </div>
            </div>
        </React.Fragment>
    )


}
export default ReadAllBlog