import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const Photo = (props) => {
    const { photo, col, isFetching, fetchPhoto } = { ...props }
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
        src = `data:image/png;base64, ${photo}`
    }

    return (
        <div className={col}>
            <img
                alt='photo'
                src={src}
                style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
    )
}
