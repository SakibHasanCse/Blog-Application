import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import moment from 'moment'
import Head from 'next/head'
import Link from 'next/link'
import { getUserProfilewithblog } from '../../actions/user'
import { API, APPNAME, DOMAIN, FBID } from '../../config'
const UserNameProfile = ({ user, blogs, query }) => {
    const [searchBlog, setSearchBlog] = useState({})
    const head = () => {
        return (
            <Head>
                <title>{user.name} | {APPNAME}</title>
                <meta name="description" content={`Blogs by ${user.name}`} />
                <meta rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
                <meta property="og:title" content={`${user.name} | ${APPNAME}`} />
                <meta property="og:description" content={`Blogs by ${user.name}`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
                <meta property="og:site_name" content={APPNAME} />
                <meta property="og:image" content={`${DOMAIN}/static/images/seoimage.jpg`} />
                <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoimage.jpg`} />
                <meta property="og:image:type" content="image/jpg" />
                <meta property="fb:app_id" content={`${FBID}`} />
            </Head>
        )

    }


    const getFilterBlogs = () => (

        blogs.filter((blog) => searchBlog === "" ? true : blog.title.toLowerCase().includes(searchBlog))

    )

    const showUserBlogs = () => {

        if (!blogs.length) {
            return (<p>User did not write a blog!</p>)
        } else {

            return getFilterBlogs().map((blog, i) => (
                <div key={i} className="mt-4 mb-4">
                    <Link href={`/blogs/${blog.slug}`}>
                        <a>{blog.title}</a>
                    </Link>
                </div>
            ))

        }
    }

    return (
        <React.Fragment>
            {head()}
            <Layout>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5>{user.name}</h5>
                                    <Link href={`${user.profile}`}>
                                        <a >
                                            View Profile
                                        </a>
                                    </Link>
                                    <p className="text-muted">Joined {moment(user.createdAt).fromNow()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <br />
                <div className="container pt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-white  bg-primary pl-4 pr-4 pt-4 pb-4">
                                        Recent blogs by {user.name}
                                    </h5>
                                    <input type="text" placeholder="Search blog..." className="form-control" onChange={(e) => setSearchBlog(e.target.value)} />

                                    {showUserBlogs()}

                                </div>
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-white bg-primary pl-4 pr-4 pt-4 pb-4">
                                        Message {user.name}
                                    </h5>
                                    <br />
                                    <p>Contact Form</p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </Layout>


        </React.Fragment>
    )
}
UserNameProfile.getInitialProps = ({ query }) => {

    return getUserProfilewithblog(query.username)
        .then(data => {
            if (data.error) {
                console.log(data.error)

            } else {

                return { user: data.user, blogs: data.blogs, query }
            }
        })
}
export default UserNameProfile