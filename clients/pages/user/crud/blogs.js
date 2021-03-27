import React from 'react'
import Private from "../../../components/auth/Private"
import ReadAllBlog from '../../../components/crud/ReadBlogs'
import { isAuth } from '../../../actions/auth'

import Layout from '../../../components/Layout'

const Blogs = () => {
    var username = isAuth() && isAuth().username

    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-4 pb-4">
                            <h2>Manage Blogs</h2>
                        </div>
                        <div className="col-md-12">
                            <ReadAllBlog username={username} />

                        </div>
                    </div>
                </div>

            </Private>
        </Layout>
    )

}
export default Blogs