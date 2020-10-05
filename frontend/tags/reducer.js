import { 
    RECEIVE_TAG, 
    RECEIVE_TAGS,
    REMOVE_SELECTED_TAG,
    REQUEST_TAGS, 
    SELECT_TAG
} from './actions'

let initialState = {
    isFetching: false,
    tags: {},
    selected: []
}

export const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_TAGS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_TAG:
        case RECEIVE_TAGS:
            return {
                ...state,
                isFetching: false,
                tags: {
                    ...state.tags,
                    ...action.payload.tags
                }
            }
        case SELECT_TAG:
            return {
                ...state,
                selected: [...state.selected, action.payload]
            }
        case REMOVE_SELECTED_TAG:
            return {
                ...state,
                selected: state.selected.filter(tagId => tagId !== action.payload)
            }
        default:
            return state
    }
}
