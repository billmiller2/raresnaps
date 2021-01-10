import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchComments } from '../../comments'
import { fetchPhoto, Photo } from '../'

export const PhotoContainer = (props) => {
    const { photoId } = props
    const dispatch = useDispatch()

    return (
        <Photo
            fetchPhoto={(photoId) => dispatch(fetchPhoto(photoId))}
            fetchComments={(comments) => dispatch(fetchComments(comments))}
            isFetching={useSelector(state => state.photo.isFetching)}
            photo={useSelector(state => state.photo.photos[photoId])} />
    )
}
