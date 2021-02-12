import Layout from "../../../components/Layout"
import Link from 'next/Link'
import Admin from "../../../components/auth/Admin"
import Categories from "../../../components/crud/Category"
import Tags from "../../../components/crud/Tags"
const CategoryTags = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2 className="text-center">Manage Categories and Tags</h2>
                        </div>
                        <div className="col-md-6">
                            <h6 className="text-center">Categories</h6>

                            <Categories />

                        </div>
                        <div className="col-md-6">
                            <h6 className="text-center">Tags</h6>

                            <Tags />
                        </div>
                    </div>
                </div>


            </Admin>

        </Layout>
    )
}

export default CategoryTags