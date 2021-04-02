import ContactForm from "../components/form/contactForm"
import Layout from "../components/Layout"
const Contact = () => {
    return (
        <Layout>


            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h2>Contact Form</h2>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact