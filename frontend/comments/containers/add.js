import { connect } from 'react-redux'

import { fetchPhoto } from '../../photos/actions'
import { AddComment, saveComment } from '../'

const mapStateToProps = (state) => state

export const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (comment, photoId) => dispatch(saveComment(comment, photoId))
    }
}

export const AddCommentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddComment)
