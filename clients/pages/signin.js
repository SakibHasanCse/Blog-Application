import Layout from "../components/Layout"
import Link from 'next/Link'
const Signin = () => {
    return (
        <Layout>
            <h2>Hello NextJs</h2>
            <Link href='/'>Home</Link>
            <Link href='/signup'>Signup</Link>
        </Layout>
    )
}

export default Signin