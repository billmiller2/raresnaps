import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { Photo } from './'
import { Loading } from '../../common'

export const Photos = (props) => {
    const { photos, cursor, isFetching, fetchPhotos } = { ...props }

    useEffect(() => {
        if (fetchPhotos && !Object.keys(photos).length) {
            fetchPhotos(cursor)
        }
    }, [])

    useEffect(() => {
        window.onscroll = (e) => {
            //const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
        }
    }, [])

    if (isFetching) {
        return <Loading />
    }

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

    const handleScroll = (e) => console.log(e)

    return (
        <Row className='d-flex flex-wrap align-items-center'>
            { photoComponents }
        </Row >
    )
}
