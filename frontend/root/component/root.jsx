import React from 'react'

import { Nav } from './nav.jsx'

export const RootComponent = (props)  => {
    const { user, photo } = { ...props }
    let src = ''

    if (photo) {
        src = `data:image/png;base64, ${photo}`
    }

    return (
        <div className='container'>
            <Nav username={user.username} />
            <hr />
            {src &&
                <img alt='photo' src={src} />
            }
        </div>
    )
}
