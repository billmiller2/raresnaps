import { connect } from 'react-redux'

import { fetchPhoto } from '../../photos/actions'
import { Photo } from '../components'

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    dispatch(fetchPhoto())

    return {}
}

export const PhotoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Photo)
