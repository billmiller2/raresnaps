import { connect } from 'react-redux'

import { fetchComments } from '../../comments'
import { fetchPhoto, Photo } from '../../photos'

export const mapStateToProps = (state, props) => {
    const photo = state.photo.photos[props.photoId]

    return {
        photo: photo,
        isFetching: state.photo.isFetching
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        fetchPhoto: (photoId) => dispatch(fetchPhoto(photoId)),
        fetchComments: (comments) => dispatch(fetchComments(comments))
    }
}

export const PhotoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Photo)
