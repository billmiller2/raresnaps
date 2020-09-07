import { connect } from 'react-redux'

import { fetchPhoto } from '../../photos/actions'
import { saveTag } from '../../tags/actions'
import { AddTag } from '../components'

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (tag, photoId) => dispatch(saveTag(tag, photoId))
    }
}

export const AddTagContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTag)

