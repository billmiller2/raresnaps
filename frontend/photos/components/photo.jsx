import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Loading } from '../../common'

export const Photo = (props) => {
    const { photo, isFetching, fetchPhoto } = { ...props }
    const { photoId } = useParams()

    useEffect(() => {
        if (fetchPhoto && !photo) {
            fetchPhoto(photoId)
        }
    }, [])

    if (isFetching) {
        return <Loading />
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
