import { connect } from 'react-redux'

import { fetchComments } from '../../comments'
import { fetchPhoto } from '../../photos/actions'
import { Photo } from '../components'

const mapStateToProps = (state, props) => {
    const photo = state.photo.photos[props.photoId]

    return {
        photo: photo,
        isFetching: state.photo.isFetching
    }
}

const mapDispatchToProps = (dispatch) => {
    dispatch(fetchComments())

    return {
        fetchPhoto: (photoId) => dispatch(fetchPhoto(photoId))
    }
}

export const PhotoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Photo)
