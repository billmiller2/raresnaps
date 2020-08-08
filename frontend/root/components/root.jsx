import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Nav } from './'
import { Photos } from '../../photos/components'
import { PhotoContainer, AddPhotoContainer } from '../../photos/containers'

export const RootComponent = (props)  => {
    const { user, photo } = { ...props }

    return (
        <div className='container'>
            <Nav username={user.username} />
            <hr />
            <Switch>
                <Route path='/photos/add'>
                    <AddPhotoContainer />
                </Route>
                <Route path='/photos/view/:photoId'>
                    <PhotoContainer />
                </Route>
                <Route path='/'>
                    <Photos photos={photo.photos} isFetching={photo.isFetching} />
                </Route>
            </Switch>
        </div>
    )
}
