import React from 'react'

export const Photo = (props) => {
    const { photo } = { ...props }

    if (photo.isFetching) {
        return <span>Loading</span>
    }

    let src = ''

    if (photo) {
        src = `data:image/png;base64, ${photo}`
    }

    return (
        <img alt='photo' src={src} />
    )
}
