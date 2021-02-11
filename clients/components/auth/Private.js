import React from 'react'
import { useEffect } from 'react'
import { isAuth } from '../../actions/auth'
import Router from 'next/router'

const UserAuth = ({ children }) => {
    useEffect(() => {
        if (!isAuth) {
            Router.push('/signin')
        }
    }, [])

    return (
        <React.Fragment>

            {children}


        </React.Fragment>
    );
}

export default UserAuth