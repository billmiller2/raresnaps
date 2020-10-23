import React from 'react'
import { shallow } from 'enzyme'

import { Div, Small, CommentDiv, Comment } from './comment.jsx'

describe('Comment', () => {
    it('renders a div containing a comment and timestamp', () => {
        const comment = { createdAt: '2020-01-01', comment: 'Lookin good bud' }
        const wrapper = shallow(<Comment comment={comment} />)

        expect(wrapper.find(Div).length).toEqual(1)
        expect(wrapper.find(Small).length).toEqual(1)
        expect(wrapper.find(CommentDiv).length).toEqual(1)
    })
})

