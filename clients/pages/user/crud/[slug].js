import Layout from "../../../components/Layout"
import Link from 'next/Link'
import Private from "../../../components/auth/Private"
import UpdateBlog from "../../../components/crud/update-blog"

const Blogs = () => {
    return (
        <Layout>
            <Private>
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


            </Private>

        </Layout>
    )
}

export default Blogs