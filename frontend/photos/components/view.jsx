import React from 'react'
import { useParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { PhotoContainer } from '../'
import { AddTag } from '../../tags'

export const ViewPhoto = () => {
    const { photoId } = useParams()

    return (
        <Row>
            <Col xs={12} md={6}>
                <PhotoContainer photoId={photoId} />
            </Col>
            <Col xs={12} md={6}>
                <AddTag />
            </Col>
        </Row>
    )
}
