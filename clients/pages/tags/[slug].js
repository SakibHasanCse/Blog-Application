import { SingleTags } from "../../actions/tags"
import React from "react"
import BlogCard from '../../components/BlogCard'
import Layout from '../../components/Layout'
import Blogs from "../admin/crud/[slug]"
const Tags = ({ tags, blogs }) => {
    const showBlog = () => {
        if (blogs.length) {
            return blogs && blogs.map((blog, i) => (
                <BlogCard blog={blog} key={i} />
            ))
        } else {
            return (<h4 className="alert-danger">Blog Not Found with  '{tags.name}'</h4>)
        }
    }
    return (
        <React.Fragment>
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <h1 className=" display-4 font-weight-bold">{tags.name}</h1>
                        {showBlog()}
                        
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    )
}
Tags.getInitialProps = ({ query }) => {
    return SingleTags(query.slug).then(data => {
        if (data.error) {
            console.log(data.error)

        } else {
            return { tags: data.tags, blogs: data.blogs }
        }
    })

}

export default Tags