import { API } from '../config'

export const EmailContactForm = (data) => {
    console.log(data)
    var contactApi;
    if (data.authorEmail) {
        contactApi = `${API}/contact-blog-author`
    } else {
        contactApi = `${API}/contact`
    }
    return fetch(`${contactApi}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.error(err)
    })
}