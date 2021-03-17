import Layout from "../../components/Layout"
import Link from 'next/Link'
import React from 'react'
import { SingleCategory } from '../../actions/category'
import BlogCard from "../../components/BlogCard"


const Category = ({ category, blogs }) => {
    const showBlog = () => {
        if (blogs.length) {
            return blogs && blogs.map((blog, i) => (
                <BlogCard blog={blog} key={i} />
            ))
        } else {
            return (<h4 className="alert-danger">Blog Not Found with  '{category.name}'</h4>)
        }
    }
    return (<React.Fragment >
        <Layout >
            <main>
                <div className="container-fluid text-center">
                    <header>
                        <div className="col-md-12 pt-3">
                            <h2 className="display-4 font-weight-bold">{category.name}</h2>
                           {showBlog()}

                        </div>
                    </header>
                </div>
            </main>
        </Layout>
    </React.Fragment>

    )
}

Category.getInitialProps = async ({ query }) => {
    return await SingleCategory(query.slug).then((data) => {
        console.log(data)
        if (data.error) {
            console.log(data.error)

        } else {
            return { category: data.category, blogs: data.blogs }
        }
    })


}
export default Category