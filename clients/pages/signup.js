import Layout from "../components/Layout"
import Link from 'next/Link'
import SignupForm from "../components/auth/SignupComponent"
const Signin = () => {
    return (
        <Layout>
            <h2>Signin Page</h2>
            <SignupForm />
        </Layout>
    )
}

export default Signin