import React from 'react'

import { Nav } from './'
import { Photo } from '../../photos/components'

export const RootComponent = (props)  => {
    const { user, photo } = { ...props }

    return (
        <div className='container'>
            <Nav username={user.username} />
            <hr />
            <Photo photo={photo} />
        </div>
    )
}
