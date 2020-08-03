import React from 'react'

import { Nav } from './'
import { Photos } from '../../photos/components'

export const RootComponent = (props)  => {
    const { user, photo } = { ...props }

    return (
        <div className='container'>
            <Nav username={user.username} />
            <hr />
            <Photos photos={photo.photos} isFetching={photo.isFetching} />
        </div>
    )
}
