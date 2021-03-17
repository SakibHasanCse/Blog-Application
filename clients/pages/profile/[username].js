import React from 'react'
import Layout from '../../components/Layout'
import { getUserProfilewithblog } from '../../actions/user'
const UserName = ({ profile, blogs }) => {
    return (
        <React.Fragment>
            <Layout>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5>profile</h5>
                                    {JSON.stringify(profile)}
                                    {JSON.stringify(blogs)}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </Layout>


        </React.Fragment>
    )
}
UserName.getInitialProps = async ({ query }) => {
    return await getUserProfilewithblog(query.username)
        .then((data) => {
            console.log('data')

            // if (data.error) {
            //     console.log(data.error)

            // } else {
            return { profile: data, blogs: data }
            // }
        })
}
export default UserName