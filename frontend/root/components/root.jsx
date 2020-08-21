import React from 'react'
import Container from 'react-bootstrap/Container'
import { Switch, Route } from 'react-router-dom'

import { Nav } from './'
import { Photos } from '../../photos/components'
import { PhotoContainer, AddPhotoContainer } from '../../photos/containers'

export const RootComponent = (props)  => {
    const { user, photo } = { ...props }

    return (
        <Container>
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
        </Container>
    )
}
