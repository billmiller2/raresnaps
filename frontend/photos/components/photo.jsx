import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Loading } from '../../common'

export const Photo = (props) => {
    const { photo, fetchPhoto, fetchComments, isFetching } = props
    const { photoId } = useParams()

    useEffect(() => {
        if (fetchPhoto) {
            fetchPhoto(photoId)
        }
    }, [])

    const comments = (typeof photo !== 'undefined' && typeof photo.comments !== 'undefined')
        ? photo.comments 
        : []

    useEffect(() => {
        if (fetchComments && comments.length > 0) {
            fetchComments(comments)
        }
    }, [JSON.stringify(comments)])

    if (isFetching) {
        return <Loading />
    }

    if (!photo) {
        return <span>Not Found</span>
    }

    return (
        <img
            alt={photo.createdAt}
            className='mb-4'
            src={`data:image/png;base64, ${photo.data}`}
            style={{ maxWidth: '100%', maxHeight: '100%' }} />
    )
}
