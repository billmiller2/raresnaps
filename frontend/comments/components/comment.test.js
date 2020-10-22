import React from 'react'
import { shallow } from 'enzyme'

import { Comment } from './comment.jsx'

describe('Comment', () =. {
    it('renders a comment', () => {
        const wrapper = shallow(<Comment />)
        expect(wrapper.find(Comment)).to.have.lengthOf(1)
    })
})

