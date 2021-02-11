import Layout from "../../components/Layout"
import Link from 'next/Link'
import Private from "../../components/auth/Private"
const Index = () => {
    return (
        <Layout>
            <Private>
                <h2> User Profile</h2>
            </Private>

        </Layout>
    )
}

export default Index