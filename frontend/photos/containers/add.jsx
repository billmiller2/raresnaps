import { connect } from 'react-redux'

import { uploadPhoto } from '../../photos/actions'
import { AddPhoto } from '../components'

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => dispatch(uploadPhoto())
    }
}

export const AddPhotoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPhoto)

