import { connect } from 'react-redux'

import { fetchPhoto } from '../../photos/actions'
import { Photo } from '../components'

const mapStateToProps = (state, props) => {
    return {
        photo: state.photo.photos[props.photoId],
        isFetching: state.photo.isFetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPhoto: (photoId) => dispatch(fetchPhoto(photoId))
    }
}

export const PhotoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Photo)
