import React from 'react'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { Photo } from './'

export const Photos = (props) => {
    const { photos, isFetching } = { ...props }

    if (isFetching) {
        return <span>Loading</span>
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

    return (
        <Row className='d-flex flex-wrap align-items-center'>
            { photoComponents }
        </Row >
    )
}
