import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const Photo = (props) => {
    const { photo, isFetching, fetchPhoto } = { ...props }
    const { photoId } = useParams()

    useEffect(() => {
        if (fetchPhoto) {
            fetchPhoto(photoId)
        }
    }, [])

    if (isFetching) {
        return <span>Loading</span>
    }

    if (!photo) {
        return <span>Not Found</span>
    }

    let src = ''

    if (photo) {
        src = `data:image/png;base64, ${photo.data}`
    }

    return (
        <img
            alt='photo'
            src={src}
            style={{ maxWidth: '100%', maxHeight: '100%' }} />
    )
}
