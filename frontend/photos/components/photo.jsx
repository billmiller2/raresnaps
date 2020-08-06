import React from 'react'

export const Photo = (props) => {
    const { photo, col, isFetching } = { ...props }

    if (isFetching) {
        return <span>Loading</span>
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
