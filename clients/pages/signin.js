import Layout from "../components/Layout"
import Link from 'next/Link'
import SigninForms from "../components/auth/SigninComponent"
const Signin = () => {
    return (
        <Layout>
            <h2 className="text-center pt-4 pb-4">Signin</h2>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <SigninForms />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Signin