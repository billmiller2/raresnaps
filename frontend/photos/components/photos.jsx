import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import { Photo } from './'
import { Loading } from '../../common'
import {
    Tag,
    SearchTag,
    RandomTagContainer,
    TagOfDayContainer,
    selectTag,
    removeSelectedTag
} from '../../tags'

const LoadingContainer = styled.div`
    min-height: 60px;
`
const PaddedDiv = styled.div`
    display: inline;

    @media(max-width: 768px) {
        display: block;
        padding: 10px;
    }
`

export const Photos = (props) => {
    const { photos, since, isFetching, fetchPhotos, selected, tags } = props

    useEffect(() => {
        if (fetchPhotos && !Object.keys(photos).length && !isFetching) {
            fetchPhotos(since, selected)
        }
    }, [since])

    useEffect(() => {
        if (selected) {
            fetchPhotos('', selected)
        }
    }, [JSON.stringify(selected)])

    useEffect(() => {
        window.onscroll = (e) => {
            const scroll = e.target.scrollingElement
            const bottom = Math.abs(
                scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight
            ) <= 3
            const path = window.location.pathname

            if (bottom && path === '/') {
                fetchPhotos(since, selected)
            }
        }
    })

    let photoComponents = []

    for (const [id, photo] of Object.entries(photos)) {
        if (!selected.length || selected.every(tagId => photo.tags.includes(tagId))) {
            photoComponents.push(
                <Col key={id} xs={12} sm={12} md={12} lg={4}>
                    <Link to={'/photos/view/' + id}>
                        <Photo photo={photo} />
                    </Link>
                </Col>
            )
        }
    }

    const dispatch = useDispatch()

    return (
        <div className='min-vh-100'>
            <Row className='mb-3'>
                <Col xs={12} className='d-flex flex-wrap justify-content-center'>
                    <SearchTag />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col xs={12} className='d-flex flex-wrap justify-content-center'>
                    <PaddedDiv>
                        <TagOfDayContainer />
                    </PaddedDiv>
                    <PaddedDiv>
                        <RandomTagContainer tags={tags} />
                    </PaddedDiv>
                </Col>
            </Row>
            <Row className='mb-5'>
                <Col xs={12} className='d-flex flex-wrap justify-content-center'>
                    { tags.length > 0 &&
                        tags.map(tag =>
                            <Tag
                                dismissible={true}
                                key={tag._id}
                                onClick={ (tagId) => dispatch(removeSelectedTag(tagId)) }
                                tag={tag} />
                        )
                    }
                </Col>
            </Row>
            <Row className='d-flex flex-wrap align-items-center'>
                { photoComponents }
            </Row >
            <LoadingContainer>
                { isFetching && <Loading /> }
            </LoadingContainer>
        </div>
    )
}
