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
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </Layout>


        </React.Fragment>
    )
}
UserName.getInitialProps = ({ query }) => {
    return getUserProfilewithblog(query.username).then((data) => {
        console.log(data)

        if (data.error) {
            console.log(data.error)
        } else {
            return { profile: data.user, blogs: data.blogs }
        }
    }).catch(err => console.log(err))
}
export default UserName