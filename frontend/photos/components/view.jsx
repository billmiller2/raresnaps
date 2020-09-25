import React from 'react'
import { useParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { PhotoContainer } from '../'
import { AddCommentContainer, CommentsContainer } from '../../comments'
import { AddTagContainer, TagsContainer } from '../../tags'

export const ViewPhoto = () => {
    const { photoId } = useParams()

    return (
        <Row>
            <Col xs={12} md={6}>
                <PhotoContainer photoId={photoId} />
            </Col>
            <Col xs={12} md={6}>
                <Row className='mb-3'>
                    <Col xs={12}>
                        <AddTagContainer photoId={photoId} />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col xs={12}>
                        <TagsContainer photoId={photoId} />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col xs={12}>
                        <AddCommentContainer photoId={photoId} />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col xs={12}>
                        <CommentsContainer photoId={photoId} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
