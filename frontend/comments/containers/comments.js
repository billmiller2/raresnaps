import { connect } from 'react-redux'

import { Comments } from '../'

const mapStateToProps = (state, props) => {
    const { photoId } = props
    const photo = state.photo.photos[photoId]
    let comments = []

    if (typeof photo !== 'undefined' && typeof photo.comments !== 'undefined') {
        photo.comments.forEach(commentId => {
            if (typeof state.comment.comments[commentId] !== 'undefined') {
                comments.push(state.comment.comments[commentId])
            }
        })
    }

    return {
        comments
    }
}

export const CommentsContainer = connect(mapStateToProps)(Comments)
