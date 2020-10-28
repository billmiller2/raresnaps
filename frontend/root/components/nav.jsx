import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import BootstrapNav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import styled from 'styled-components'

import { ADD_PHOTO_ROUTE } from '../../photos'
import { LOGOUT_ROUTE } from '../../users'

const MauveNav = styled(Navbar)`
    background-color: #a17188;
`

const Item = styled(Dropdown.Item)`
    &:active {
        background-color: #a17188;
        color: #ffffff;
    }
`

export const Nav = (props) =>
    <MauveNav expand='lg'>
        <Navbar.Brand href='/' style={{color: '#ffffff'}}>
            raresnaps
        </Navbar.Brand>
        <BootstrapNav className='ml-auto'>
            <Dropdown align='right' alignRight>
                <Dropdown.Toggle style={{
                    backgroundColor: '#a17188',
                    borderColor: 'white'
                }}>
                    { props.username }
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Item href={ ADD_PHOTO_ROUTE }>
                        Add Photo
                    </Item>
                    <Dropdown.Divider />
                    <Item href={ LOGOUT_ROUTE }>
                        Logout
                    </Item>
                </Dropdown.Menu>
            </Dropdown>
        </BootstrapNav>
    </MauveNav>
