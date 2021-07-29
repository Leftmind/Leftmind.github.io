/* eslint-disable react/prop-types */
import React from 'react'
import { Container } from '@material-ui/core'
import AccountProfileDetails from './profile/accountProfile'

const Profile = ({ usedUser }) => (
  <Container>
    <AccountProfileDetails usedUser={usedUser} />
  </Container>
)

export default Profile
