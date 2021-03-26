import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { getUserProfile, updateUserProfile } from '../../actions/user'
import { getCookie, UpdateUser } from '../../actions/auth'
import { API } from '../../config'
const UpdateProfile = () => {
    const [values, setValues] = useState({
        name: '',
        email: '', photo: '',
        password: '', username: '',
        about: '', error: '', success: '',
        loading: false, dataForm: ''
    })


    const { name, email,
        photo, password, username,
        about, error, success, loading, dataForm } = values

    var token = getCookie('token')


    const init = () => {
        setValues({ ...values, loading: true })
        getUserProfile(token)
            .then(response => {
                if (response.error) {
                    setValues({ ...values, error: response.error, success: '', loading: false })
                } else {
                    setValues({
                        ...values, error: '',
                        email: response.email,
                        username: response.username,
                        name: response.name,
                        about: response.about,
                        loading: false
                    })

                }
            })
    }

    useEffect(() => {
        init()
    }, [])


    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value

        let userdataForm = new FormData()
        userdataForm.set(name, value)
        setValues({ ...values, [name]: value, dataForm: userdataForm, error: '', success: '', })

    }

    const HandleSubmit = (e) => {
        e.preventDefault()
        setValues({ ...values, loading: true })
        updateUserProfile(token, dataForm)

            .then(response => {

                if (response.error) {
                    setValues({ ...values, loading: false, error: response.error, success: '' })
                } else {
                    UpdateUser(response, () => {
                        setValues({
                            ...values,
                            email: response.email,
                            username: response.username,
                            name: response.name,
                            about: response.about,
                            loading: false,
                            error: '',
                            success: 'User Updated successfully'
                        })
                        init()
                    })


                }
            })


    }
    const showError = () => {
        return (<div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>{error}</div>)
    }
    const showMessage = () => {
        return (<div className="alert alert-success" style={{ display: success ? "" : 'none' }}>{success}</div>)
    }
    const showLoading = () => {
        return (<div className="alert alert-info" style={{ display: loading ? "" : 'none' }}>Loading...</div>)
    }
    const showForm = () => {
        return (
            <div>
                <h3 className="text-muted text-center">Update Profile</h3>
                <form onSubmit={HandleSubmit}>
                    <div className="form-group">
                        <label className="btn btn-outline-primary">Profile Photo

                        <input type="file" onChange={handleChange('photo')} className="form-control" Accept="image*/" hidden />
                        </label>
                    </div>
                    <div className="form-group">
                        <label >UserName</label>
                        <input type="text" value={username} onChange={handleChange('username')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label >Name</label>
                        <input type="text" value={name} onChange={handleChange('name')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label >Email</label>
                        <input type="email" value={email} onChange={handleChange('email')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>About</label>
                        <input type="text" value={about} onChange={handleChange('about')} className="form-control" />
                    </div>

                    <div className="form-group">
                        <label >Password</label>
                        <input type="text" value={password} onChange={handleChange('password')} className="form-control" />
                    </div>
                    <button className="btn btn-info" type="submit">Update</button>

                </form>

            </div>
        )
    }

    return (
        <React.Fragment>
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={`${API}/user/photo/${username}`} className="img img-fluid img-thumbnail mb-3" style={{ maxHeight: 'auto', maxWidth: '100%' }} alt="User Profile" />
                        </div>
                        <div className="col-md-8">
                            <div className="pt-2 pb-2">
                                {showLoading()}
                                {showMessage()}
                                {showError()}
                            </div>
                            {showForm()}
                        </div>
                    </div>


                </div>
            </Layout>

        </React.Fragment>

    )
}
export default UpdateProfile