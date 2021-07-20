/* eslint-disable react/prop-types */
import React from 'react'
import { Container, Grid } from '@material-ui/core'
import AccountProfileDetails from './profile/accountProfile'

const Profile = ({ usedUser }) => (
  <Container>
    <Grid>
      <AccountProfileDetails usedUser={usedUser} />
    </Grid>
  </Container>
)

export default Profile
