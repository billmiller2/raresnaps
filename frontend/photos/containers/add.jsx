import { connect } from 'react-redux'

import { uploadPhoto } from '../../photos/actions'
import { AddPhoto } from '../components'

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (file) => dispatch(uploadPhoto(file))
    }
}

export const AddPhotoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPhoto)

