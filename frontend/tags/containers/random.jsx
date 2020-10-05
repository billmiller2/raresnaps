import { connect } from 'react-redux'

import { RandomTag } from '../'

const mapStateToProps = (state) => {
    return {
        selected: state.tag.selected,
        tags: state.tag.tags
    }
}

export const RandomTagContainer = connect(mapStateToProps)(RandomTag)
