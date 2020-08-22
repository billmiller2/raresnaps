import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { Photo } from './'

export const Photos = (props) => {
    const { photos, isFetching } = { ...props }

    if (isFetching) {
        return <span>Loading</span>
    }

    let photoComponents = []

    Object.values(photos).forEach((photo, i) => photoComponents.push(
        <Col key={i} xs={12} md={4}>
            <Photo photo={photo} />
        </Col>
    ))

    return (
        <Row className='d-flex flex-wrap align-items-center'>
            { photoComponents }
        </Row >
    )
}
