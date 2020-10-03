import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import { Photo } from './'
import { Loading } from '../../common'
import { Tag, SearchTag, selectTag } from '../../tags'

const LoadingContainer = styled.div`
    min-height: 60px;
`

export const Photos = (props) => {
    const { photos, since, isFetching, fetchPhotos, selected, tag } = props

    useEffect(() => {
        if (fetchPhotos && !Object.keys(photos).length) {
            fetchPhotos(since, selected)
        }
    }, [since])

    useEffect(() => {
        if (selected) {
            fetchPhotos('', selected)
        }
    }, [selected])

    useEffect(() => {
        window.onscroll = (e) => {
            const scroll = e.target.scrollingElement
            const bottom = scroll.scrollHeight - scroll.scrollTop === scroll.clientHeight
            const path = window.location.pathname

            if (bottom && path === '/') {
                fetchPhotos(since, selected)
            }
        }
    })

    let photoComponents = []

    for (const [id, photo] of Object.entries(photos)) {
        if (!selected || photo.tags.includes(selected)) {
            photoComponents.push(
                <Col key={id} xs={12} md={4}>
                    <Link to={'/photos/view/' + id}>
                        <Photo photo={photo} />
                    </Link>
                </Col>
            )
        }
    }

    const dispatch = useDispatch()

    return (
        <>
        <Row className='mb-5'>
            <Col xs='12' className='d-flex flex-wrap justify-content-center'>
                <SearchTag />
                { tag && 
                    <Tag 
                        dismissible={true}
                        tag={tag} 
                        selectId=''
                        selectTag={ (tagId) => dispatch(selectTag(tagId)) } /> }
            </Col>
        </Row>
        <Row className='d-flex flex-wrap align-items-center'>
            { photoComponents }
        </Row >
        <LoadingContainer>
            { isFetching && <Loading /> }
        </LoadingContainer>
        </>
    )
}
