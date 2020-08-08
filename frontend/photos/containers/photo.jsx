import { connect } from 'react-redux'

import { fetchPhoto } from '../../photos/actions'
import { Photo } from '../components'

const mapStateToProps = (state) => {
    return {
        col: 'col-md-6',
        photo: state.photo.photo,
        isFetching: state.photo.isFetching
    }
}

const mapDispatchToProps = (dispatch) => {
    dispatch(fetchPhoto())

    return {}
}

export const PhotoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Photo)