import Layout from "../../components/Layout"
import Link from 'next/Link'
import Admin from "../../components/auth/Admin"
const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">

                            <h2>Admin Index</h2>
                        </div>
                        <div className="col-md-4">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a>Create Category </a>
                                    </Link>

                                </li>
                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a>Create Tags </a>
                                    </Link>

                                </li>
                                <li className="list-group-item">
                                    <Link href="/admin/crud/blog">
                                        <a>Create Blogs </a>
                                    </Link>

                                </li>
                                <li className="list-group-item">
                                    <Link href="/admin/crud/blogs">
                                        <a>Update and delete</a>
                                    </Link>

                                </li>
                            </ul>
                        </div>
                        <div className="col-md-8">

                        </div>
                    </div>
                </div>


            </Admin>

        </Layout>
    )
}

export default AdminIndex