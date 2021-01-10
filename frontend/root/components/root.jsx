import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import { Switch, Route } from 'react-router-dom'

import { Nav } from './'
import {
    ADD_PHOTO_ROUTE,
    AddPhoto,
    PhotosContainer,
    VIEW_PHOTO_ROUTE,
    ViewPhoto
} from '../../photos'
import { fetchTags } from '../../tags'

export const RootComponent = (props)  => {
    const { user, photo } = { ...props }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTags())
    }, [])

    return (
        <Container>
            <Nav username={user.username} />
            <hr />
            <Switch>
                <Route path={ADD_PHOTO_ROUTE}>
                    <AddPhoto />
                </Route>
                <Route path={VIEW_PHOTO_ROUTE}>
                    <ViewPhoto />
                </Route>
                <Route path='/'>
                    <PhotosContainer />
                </Route>
            </Switch>
        </Container>
    )
}
