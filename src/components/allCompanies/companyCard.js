/* eslint-disable react/prop-types */
import React from 'react'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  CardMedia,
} from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram'
import Logga from '../../assets/Logga-framtidsportalen.png'

const CompanyCard = ({ companies }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}
  >
    <CardContent>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        {companies.companyImage ? (
          <CardMedia
            component="img"
            alt="company image"
            image={companies.companyImage}
            title="Company Image"
            style={{
              borderRadius: 200,
              height: 200,
              width: 200,
            }}
          />
        ) : (
          <Avatar
            src={Logga}
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              height: 200,
              width: 200,
            }}
          />
        )}
      </Grid>
      <Typography align="center" color="textPrimary" gutterBottom variant="h5">
        {companies.companyName}
      </Typography>
      <Typography align="center" color="textSecondary" variant="body1">
        {companies.points} Poäng
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
      <Grid
        item
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box style={{ padding: 10 }}>
          <InstagramIcon style={{ fontSize: 30 }} />
          <Typography
            color="textSecondary"
            display="inline"
            variant="body2"
            style={{ verticalAlign: 'middle' }}
          >
            {companies.instagram}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Card>
)

export default CompanyCard
