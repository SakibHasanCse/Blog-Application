import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'
import Head from 'next/head'
import { ListBlogwithCategoryAndTags, SingleBlogAPI } from '../../actions/blog'
import moment from 'moment'
import renderHTML from 'react-render-html';
import BlogCard from '../../components/BlogCard'
import { API, DOMAIN, FBID, APPNAME } from '../../config'
import { withRouter } from 'next/router'

const SingleBlog = ({ blog, router }) => {
    const head = () => {
        return (
            <Head>
                <title>{blog.title} | {APPNAME}</title>
                <meta name="description" content={blog.mdesc} />
                <meta rel="canonical" href={`${DOMAIN}/blog/${router.pathname}`} />
                <meta property="og:title" content={`${blog.title} | ${APPNAME}`} />
                <meta property="og:description" content={`${blog.mdesc}`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${DOMAIN}/blogs/${router.pathname}`} />
                <meta property="og:site_name" content={APPNAME} />

                <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
                <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
                <meta property="og:image:type" content="image/jpg" />
                <meta property="fb:app_id" content={`${FBID}`} />





            </Head>
        )

    }

    const ShowCategory = (blog) => {
        return blog.categories.map((category, i) => (
            <Link href={`/catagory/${category.slug}`}>
                <a className="btn btn-primary ml-1 mr-1 mt-3"> {category.name}</a>
            </Link>

        ))
    }
    const ShowTags = (blog) => {
        return blog.tags.map((tag, i) => (
            <Link href={`/tags/${tag.slug}`}>
                <a className="btn btn-outline-primary ml-1 mr-1 mt-3"> {tag.name}</a>
            </Link>

        ))
    }
    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <article>
                        <div className="container-fluid">
                            <section>
                                <div className="row" style={{ marginTop: '-30px' }}>
                                    <img src={`${API}/blog/photo/${blog.slug}`} alt={`${blog.title}`} className="img img-fluid featured-image" />

                                </div>
                            </section>
                            <section>
                                <div className="container">
                                    <h3 className="display-4 text-center pb-3 bt-3 text-weight-bold">{blog.title}</h3>


                                    <div className="lead mt-3 mark">
                                        Written by {blog.postedBy.name} | Publish {moment(blog.createdAt, "YYYYMMDD").fromNow()}

                                    </div>

                                    <div className="pb-3">
                                        {ShowCategory(blog)}
                                        {ShowTags(blog)}
                                        <br /><br />
                                    </div>
                                </div>
                            </section>

                        </div>
                        <div className="container">
                            <section>
                                <div className="col-md-12">
                                    {renderHTML(blog.body)}
                                </div>
                            </section>
                        </div>
                        <div className="container pt-4">
                            <section>

                                <h4 className="text-center pt-5 pb-5 h2"> Related Blogs
                                       </h4>
                                <hr />
                                <p>Show relared blog</p>

                            </section>
                        </div>
                        <div className="container pt-4">
                            <section>
                                <p>Show Comment</p>

                            </section>
                        </div>
                    </article>
                </main>
            </Layout>

        </React.Fragment>
    )
}

SingleBlog.getInitialProps = ({ query }) => {
    return SingleBlogAPI(query.slug).then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            return { blog: data }
        }
    })

}
export default withRouter(SingleBlog)