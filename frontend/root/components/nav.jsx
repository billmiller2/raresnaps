import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from 'react-bootstrap/Navbar'

import styled from 'styled-components'

import { AddPhotoContainer } from '../../photos/containers'

const MauveNav = styled(Navbar)`
    background-color: #a17188
`

export const Nav = (props) =>
    <MauveNav expand='lg'>
        <a className='navbar-brand' style={{color: '#ffffff'}}>
            raresnaps
        </a>
        <AddPhotoContainer />
        <Dropdown>
            <Dropdown.Toggle style={{
                backgroundColor: '#a17188',
                borderColor: 'white'
            }}>
                { props.username }
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href='/users/logout'>
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </MauveNav>
