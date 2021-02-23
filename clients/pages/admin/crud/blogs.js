import React from 'react'
import Admin from "../../../components/auth/Admin"
import ReadAllBlog from '../../../components/crud/ReadBlogs'

import Layout from '../../../components/Layout'

const Blogs = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-4 pb-4">
                            <h2>Manage Blogs</h2>
                        </div>
                        <div className="col-md-12">
                            <ReadAllBlog />

                        </div>
                    </div>
                </div>

            </Admin>
        </Layout>
    )

}
export default Blogs