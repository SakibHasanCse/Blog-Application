import Layout from "../../components/Layout"
import Link from 'next/Link'
import React from 'react'
import { SingleBlogAPI } from '../../actions/blog'


const Category = ({ category }) => {
    return (<React.Fragment >
        <Layout >
            <main>
                <div className="container-fluid text-center">
                    <header>
                        <div className="col-md-12 pt-3">
                            <h1 className="display-4 font-weight-bold">Category Name</h1>
                            {JSON.stringify(category)}
                        </div>
                    </header>
                </div>
            </main>
        </Layout>
    </React.Fragment>

    )
}

Category.getInitialProps = async ({ query }) => {
    return await SingleBlogAPI(query.slug).then((response) => {
        console.log(response)
        if (response.error) {
            console.log(response.error)

        } else {
            return { category: response }
        }
    })


}
export default Category