import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import { Photo } from './'
import { Loading } from '../../common'

const LoadingContainer = styled.div`
    min-height: 60px;
`

export const Photos = (props) => {
    const { photos, since, isFetching, fetchPhotos } = { ...props }

    useEffect(() => {
        if (fetchPhotos && !Object.keys(photos).length) {
            fetchPhotos(since)
        }
    }, [])

    useEffect(() => {
        window.onscroll = (e) => {
            const scroll = e.target.scrollingElement
            const bottom = scroll.scrollHeight - scroll.scrollTop === scroll.clientHeight

            if (bottom) {
                fetchPhotos(since)
            }
        }
    })

    let photoComponents = []

    for (const [id, photo] of Object.entries(photos)) {
        photoComponents.push(
            <Col key={id} xs={12} md={4}>
                <Link to={'/photos/view/' + id}>
                    <Photo photo={photo} />
                </Link>
            </Col>
        )
    }

    return (
        <>
        <Row className='d-flex flex-wrap align-items-center'>
            { photoComponents }
        </Row >
        <LoadingContainer>
            { isFetching && <Loading /> }
        </LoadingContainer>
        </>
    )
}
