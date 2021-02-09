import Layout from "../components/Layout"
import Link from 'next/Link'
const Signin = () => {
    return (
        <Layout>
            <h2>Signin Page</h2>
            <Link href='/'>Home</Link>
            <Link href='/signin'>Signin</Link>
        </Layout>
    )
}

export default Signin