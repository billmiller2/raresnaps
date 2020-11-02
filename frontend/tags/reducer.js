import * as types from './actions/types'

export let initialState = {
    error: null,
    isFetching: false,
    tags: {},
    selected: []
}

export const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REQUEST_TAGS:
            return {
                ...state,
                isFetching: true
            }
        case types.RECEIVE_TAG:
        case types.RECEIVE_TAGS:
            return {
                ...state,
                isFetching: false,
                tags: {
                    ...state.tags,
                    ...action.payload.tags
                }
            }
        case types.SELECT_TAG:
            if (action.payload) {
                return {
                    ...state,
                    selected: [...state.selected, action.payload]
                        .filter((value, index, self) => self.indexOf(value) === index)
                }
            }
        case types.REMOVE_SELECTED_TAG:
            return {
                ...state,
                selected: state.selected.filter(tagId => tagId !== action.payload)
            }
        default:
            return state
    }
}
