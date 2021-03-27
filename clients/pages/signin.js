import Layout from "../components/Layout"
import Link from 'next/Link'
import SigninForms from "../components/auth/SigninComponent"
import { withRouter } from "next/Router"
const Signin = ({ router }) => {
    const showRouterMessage = () => {
        if (router.query.message) {
            return (<div className="alert alert-danger">{router.query.message} </div>)

        } else {
            return;
        }
    }
    return (
        <Layout>
            <h2 className="text-center pt-4 pb-4">Signin</h2>
            <div className="container">
                <div className="row pb-2">
                    <div className="col-md-12">
                        {showRouterMessage()}
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-8 offset-md-2">

                        <SigninForms />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(Signin)