import React from 'react'
import Container from 'react-bootstrap/Container'
import { Switch, Route } from 'react-router-dom'

import { Nav } from './'
import {
    ADD_PHOTO_ROUTE,
    AddPhotoContainer,
    Photos,
    VIEW_PHOTO_ROUTE,
    ViewPhoto
} from '../../photos'

export const RootComponent = (props)  => {
    const { user, photo } = { ...props }

    return (
        <Container>
            <Nav username={user.username} />
            <hr />
            <Switch>
                <Route path={ADD_PHOTO_ROUTE}>
                    <AddPhotoContainer />
                </Route>
                <Route path={VIEW_PHOTO_ROUTE}>
                    <ViewPhoto />
                </Route>
                <Route path='/'>
                    <Photos photos={photo.photos} isFetching={photo.isFetching} />
                </Route>
            </Switch>
        </Container>
    )
}
