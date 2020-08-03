import React from 'react'

import { Photo } from './'

export const Photos = (props) => {
    const { photos, isFetching } = { ...props }

    if (isFetching) {
        return <span>Loading</span>
    }

    let photoComponents = []

    photos.forEach((photo, i) => photoComponents.push(
        <Photo key={i} photo={photo} col="col-md-4" />)
    )

    return (
        <div className="row">
            { photoComponents }
        </div>
    )
}
