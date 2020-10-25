import React from 'react'
import { shallow } from 'enzyme'

import { Comment } from './comment.jsx'
import { Comments } from './comments.jsx'

describe('Comments', () => {
    it('renders a comment component for each comment in props', () => {
        const comments = [
            { _id: '123', createdAt: '2020-01-01', comment: 'Lookin good bud' },
            { _id: '1234', createdAt: '2020-01-02', comment: 'Lookin great bud' }
        ]
        const wrapper = shallow(<Comments comments={comments} />)

        expect(wrapper.find(Comment).length).toEqual(2)
    })

    it('does not render if comments is undefined', () => {
        const wrapper = shallow(<Comments />)

        expect(wrapper.find(Comment).length).toEqual(0)
    })
})

