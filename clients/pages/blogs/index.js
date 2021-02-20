import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'
import Head from 'next/head'
import { ListBlogwithCategoryAndTags } from '../../actions/blog'
import moment from 'moment'
import renderHTML from 'react-render-html';
import BlogCard from '../../components/BlogCard'
import { API, DOMAIN, FBID, APPNAME } from '../../config'
import { withRouter } from 'next/router'
const Blogs = ({ blogs, categories, tags, TotalBlogs,
    BlogLimit,
    BlogSize, router }) => {

    const head = () => (
        <Head>
            <title>Sakib Blogs | {APPNAME}</title>
            <meta name="description" content="Sakib Blogs all type of posts and categories" />
            <link rel="canonical" href={`${DOMAIN} ${router.pathname}`} />
            <meta property="og:title" content={`New Blog Posts | ${APPNAME}`} />

            <meta property="og:description" content='blog article on my website sakib' />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN} ${router.pathname}`} />
            <meta property="og:site_name" content={`${APPNAME}`} />
            <meta property="og:image" content={`${DOMAIN}/static/images/seoimage.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoimage.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FBID}`} />

        </Head>
    )
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(BlogLimit)
    const [size, setSize] = useState(TotalBlogs)
    const [loadedBlogs, setLoadedBlogs] = useState([])

    const loadMore = () => {
        let toSkip = skip + limit
        ListBlogwithCategoryAndTags(toSkip, limit).then(data => {
            if (data.error) {
                console.log(data.error)

            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs])
                setSkip(toSkip)
                setSize(data.size)
            }
        })

    }

    const LoadMoreButton = () => {
        return size > 0 && size >= limit && (<button onClick={loadMore} className="btn btn-primary ">Load More</button>)
    }

    const showALlBlogs = () => {
        return (
            blogs && blogs.map((blog, i) => (

                <article key={i}>
                    <BlogCard blog={blog} />

                    <hr />
                </article >

            )

            )
        )
    }
    const showAllCategories = () => {
        return (
            categories && categories.map((category, i) => (
                <Link key={i} href={`/category/${category.slug}`}>
                    <a className="btn btn-primary ml-1 mr-1 mt-3">{category.name}</a>
                </Link>
            ))
        )
    }
    const showAllTags = () => {
        return (
            tags && tags.map((tag, i) => (
                <Link key={i} href={`/tags/${tag.slug}`}>
                    <a className="btn btn-outline-primary ml-1 mr-1 mt-3">{tag.name}</a>
                </Link>
            ))
        )
    }

    const showAllNewBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <article key={i}>
                <BlogCard blog={blog} />
                <hr />

            </article>
        ))
    }
    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid">
                        <header>
                            <div className="col-md-12 pt-4">
                                <h1 className="text-center display-4 font-weight-bold">My New Blog and Posts</h1>
                            </div>
                            <section>
                                <div className="pb-5 text-center">
                                    {showAllCategories()}
                                    <br />
                                    {showAllTags()}
                                </div>

                            </section>


                        </header>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                {showALlBlogs()}
                                {showAllNewBlogs()}
                                <div className="text-center p-5">

                                    {LoadMoreButton()}
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </Layout>
        </React.Fragment>

    )
}

Blogs.getInitialProps = () => {
    var skip = 0;
    var limit = 1
    return ListBlogwithCategoryAndTags(skip, limit).then((data) => {

        if (data.error) {


        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                TotalBlogs: data.size,
                BlogLimit: limit,
                Blogskip: skip,


            }
        }
    })
}
export default withRouter(Blogs)