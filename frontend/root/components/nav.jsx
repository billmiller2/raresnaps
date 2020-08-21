import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import BootstrapNav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import styled from 'styled-components'

import { AddPhotoContainer } from '../../photos/containers'

const MauveNav = styled(Navbar)`
    background-color: #a17188
`

export const Nav = (props) =>
    <MauveNav expand='lg'>
        <Navbar.Brand href='/' style={{color: '#ffffff'}}>
            raresnaps
        </Navbar.Brand>
        <AddPhotoContainer />
        <BootstrapNav className='ml-auto'>
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
        </BootstrapNav>
    </MauveNav>
