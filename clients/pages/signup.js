import Layout from "../components/Layout"
import Link from 'next/Link'
import SignupForm from "../components/auth/SignupComponent"
const Signin = () => {
    return (
        <Layout>
            <h2 className="text-center pt-4 pb-4">Signup</h2>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">

                        <SignupForm />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Signin