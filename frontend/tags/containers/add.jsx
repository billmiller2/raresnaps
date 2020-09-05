import { connect } from 'react-redux'

import { saveTag } from '../../tags/actions'
import { AddTag } from '../components'

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (tag) => dispatch(saveTag(tag))
    }
}

export const AddTagContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTag)

