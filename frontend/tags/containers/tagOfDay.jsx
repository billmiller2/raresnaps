import { connect } from 'react-redux'

import { TagOfDay } from '../'

const mapStateToProps = (state) => {
    return {
        tagOfDay: Object.values(state.tag.tags).find(tag => tag.isTagOfDay) || ''
    }
}

export const TagOfDayContainer = connect(mapStateToProps)(TagOfDay)
