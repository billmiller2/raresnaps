import React from 'react'

import { Photo } from './'

export const Photos = (props) => {
    const { photos } = { ...props }

    if (photos.isFetching) {
        return <span>Loading</span>
    }

    let photoComponents = []

    photos.forEach((photo, i) => photoComponents.push(
        <Photo key={i} photo={photo} />)
    )

    return (
        <div>
            { photoComponents }
        </div>
    )
}
