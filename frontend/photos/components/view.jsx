import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { PhotoContainer } from '../'
import { AddCommentContainer, CommentsContainer } from '../../comments'
import { MauveSpan } from '../../common'
import { AddTagContainer, TagsContainer } from '../../tags'


export const ViewPhoto = () => {
    const { photoId } = useParams()
    const photo = useSelector(state => state.photo.photos[photoId])

    return (
        <Row>
            <Col xs={12} lg={6}>
                <PhotoContainer photoId={photoId} />
            </Col>
            <Col xs={12} lg={6}>
                {photo &&
                    <Row className='mb-3'>
                        <Col xs={12}>
                            <MauveSpan>
                            {new Date(photo.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'})
                            }
                            </MauveSpan>
                        </Col>
                    </Row>
                }
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
