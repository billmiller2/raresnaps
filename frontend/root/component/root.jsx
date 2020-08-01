import React from 'react'

import { Nav } from './nav.jsx'

export const RootComponent = (props)  => {
    const { user } = { ...props }

    return (
        <div className='container'>
            <Nav username={user.username} />
            <hr />
            <h1>
                raresnaps
            </h1>
        </div>
    )
}
