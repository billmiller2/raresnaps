import React from 'react'
import Row from 'react-bootstrap/Row'
import { shallow } from 'enzyme'

import { Loading, MauveSpinner } from './loading'

describe('Loading', () => {
    it('renders a Row containing a MauveSpinner', () => {
        const wrapper = shallow(<Loading />)

        const row = wrapper.find(Row)

        expect(row.length).toEqual(1)
        expect(row.children(MauveSpinner).length).toEqual(1)
    })
})
