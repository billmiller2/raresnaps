import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { PhotoContainer } from '../'
import { AddCommentContainer, Comments } from '../../comments'
import { formatDate, MauveSpan } from '../../common'
import { AddTag, TagsContainer } from '../../tags'


export const ViewPhoto = () => {
    const { photoId } = useParams()
    const photo = useSelector(state => state.photo.photos[photoId])
    let originalCreatedDate = ''

    if (photo) {
        originalCreatedDate = photo.originalCreatedDate.replace(':', '/').replace(':', '/')
    }

    return (
        <Row>
            <Col xs={12} lg={6}>
                <PhotoContainer photoId={photoId} />
            </Col>
            <Col xs={12} lg={6}>
                {photo &&
                    <>
                    <Row className='mb-3'>
                        <Col xs={12}>
                            <MauveSpan>
                            {'Snapped: ' + (
                                originalCreatedDate
                                    ? formatDate(originalCreatedDate)
                                    : 'Unknown'
                                )
                            }
                            </MauveSpan>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col xs={12}>
                            <MauveSpan>
                            {'Uploaded: ' + formatDate(photo.createdAt)}
                            </MauveSpan>
                        </Col>
                    </Row>
                    </>
                }
                <Row className='mb-3'>
                    <Col xs={12}>
                        <AddTag photoId={photoId} />
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
                        <Comments photoId={photoId} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
