import React from 'react'
import { shallow } from 'enzyme'

import { Tag } from './tag.jsx'
import { Tags } from './tags.jsx'

describe('Tags', () => {
    it('renders a tag component for each tag in props', () => {
        const tags = [
            { _id: '123', createdAt: '2020-01-01', tag: 'aaron' },
            { _id: '1234', createdAt: '2020-01-02', tag: 'daniel' }
        ]
        const wrapper = shallow(<Tags tags={tags} />)

        expect(wrapper.find(Tag).length).toEqual(2)
    })

    it('does not render if tags is undefined', () => {
        const wrapper = shallow(<Tags />)

        expect(wrapper.find(Tag).length).toEqual(0)
    })
})

