import Layout from "../../../components/Layout"
import Link from 'next/Link'
import Admin from "../../../components/auth/Admin"
import Categories from "../../../components/crud/Category"
const CategoryTags = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Manage Categories and Tags</h2>
                        </div>
                        <div className="col-md-4">
                            <Categories />

                        </div>
                        <div className="col-md-8">
                            <p>Tags</p>
                        </div>
                    </div>
                </div>

                <h2>Admin Index</h2>
            </Admin>

        </Layout>
    )
}

export default CategoryTags