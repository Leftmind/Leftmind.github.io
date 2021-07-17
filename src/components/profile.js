import React from 'react'
import { Box, Container, Grid } from '@material-ui/core'
import AccountProfileDetails from './profile/accountProfile'

const Profile = ({ usedUser }) => (
  <div>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={7}>
          <Grid item lg={8} md={12} xs={12}></Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item lg={8} md={12} xs={12}>
            <AccountProfileDetails usedUser={usedUser} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </div>
)

export default Profile
