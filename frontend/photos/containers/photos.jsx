import { connect } from 'react-redux'

import { fetchPhotos } from '../../photos/actions'
import { Photos } from '../components'

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPhotos: () => dispatch(fetchPhotos())
    }
}

export const PhotosContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Photos)
