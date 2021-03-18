import Layout from "../components/Layout"
import Link from 'next/Link'
import X from `../components/crud/demo`

const Index = () => {
    return (
        <Layout>

            <div className="container">
                <h4 className="text-center p-5">Welcome To Our Blog</h4>
            </div>
            <X />

        </Layout>
    )
}

export default Index