const sgMail = require('@sendgrid/mail') //SEND GRID API
const { errorHandler } = require('../helpers/dbErrorHandel')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
exports.ContactForm = async(req, res) => {
    try {
        const { email, name, message } = req.body

        const msg = {
            to: process.env.EMAIL_TO,
            from: email,
            subject: `Contact from - ${process.env.APP_NAME}`,
            text: `Email received from \n Sender name :${name} \n Sender email :${email} \n Message :${message}`,
            html: `
            <h4>Email received from contact form</h4>
            <p>Sender name :${name} </p>
            <p>Sender email :${email}</p>
            <p>Sender Message :${message}</p>
            <hr />
            <p>This email may contact sensetive information</p>
            <p>${process.env.CLIENT_URL}</p>

            
            `
        }
        sgMail.send(msg).then(() => {
            return res.status(200).json({ message: 'Form send successfully' })
        }, error => {
            if (error.response) {

                return res.status(400).json({ error: error.response.body.errors[0].message })
            } else {
                return res.status(400).json({ error: 'Internal server error , try again' })
            }


        })

    } catch (error) {

        return res.json({ error: errorHandler(error) })
    }

}
exports.ContactBlog_AuthorForm = async(req, res) => {
    try {
        const { authorEmail, email, name, message } = req.body
        const emailList = [authorEmail, process.env.EMAIL_TO]

        const msg = {
            to: emailList,
            from: email,
            subject: `Someone messaged you from  ${process.env.APP_NAME}`,
            text: `Email received from \n Sender name :${name} \n Sender email :${email} \n Message :${message}`,
            html: `
            <h4>Email received from</h4>
            <p>Sender name :${name} </p>
            <p>Sender email :${email}</p>
            <p>Sender Message :${message}</p>
            <hr />
            <p>This email may contact sensetive information</p>
            <p>${process.env.CLIENT_URL}</p>

            
            `
        }
        sgMail.send(msg).then(() => {
            return res.status(200).json({ message: 'Message send successfully' })
        }, error => {

            console.log(error.response.body.errors[0].message)
            if (error.response) {
                return res.status(400).json({ error: error.response.body.errors[0].message })
            } else {
                return res.status(400).json({ error: 'Internal server error , try again' })
            }

        })

    } catch (error) {
        return res.json({ error: errorHandler(error) })
    }

}