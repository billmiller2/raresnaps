import React from 'react'
import { shallow } from 'enzyme'

import { Div, Small, CommentDiv, Comment } from './comment.jsx'

describe('Comment', () => {
    it('renders a div containing a comment div and timestamp div', () => {
        const comment = { createdAt: '2020-01-01', comment: 'Lookin good bud' }
        const wrapper = shallow(<Comment comment={comment} />)

        expect(wrapper.find(Div).length).toEqual(1)
        expect(wrapper.find(Small).length).toEqual(1)
        expect(wrapper.find(CommentDiv).length).toEqual(1)
    })

    it('renders a formatted date', () => {
        const comment = { createdAt: '2020-01-01 12:00:00', comment: 'Lookin good bud' }
        const wrapper = shallow(<Comment comment={comment} />)

        expect(wrapper.find(Small).text()).toBe('Jan 1, 2020, 12:00 PM')
    })

    it('renders the comment passed in props', () => {
        const comment = { createdAt: '2020-01-01 12:00:00', comment: 'Lookin good bud' }
        const wrapper = shallow(<Comment comment={comment} />)

        expect(wrapper.find(CommentDiv).text()).toBe('Lookin good bud')
    })

    it('does not render if comment is undefined', () => {
        const wrapper = shallow(<Comment />)

        expect(wrapper.find(Div).length).toEqual(0)
    })
})

