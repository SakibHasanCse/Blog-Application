import Layout from "../../../components/Layout"
import Link from 'next/Link'
import Admin from "../../../components/auth/Admin"
import UpdateBlog from "../../../components/crud/update-blog"

const Blogs = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2 className="text-center">Update blog</h2>
                        </div>
                        <div className="col-md-12">
                            <h6 className="text-center">Categories</h6>

                            <UpdateBlog />

                        </div>

                    </div>
                </div>


            </Admin>

        </Layout>
    )
}

export default Blogs