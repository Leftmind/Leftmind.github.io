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
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Logga from '../../assets/Logga-framtidsportalen.png'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

const CompanyCard = ({ companies }) => {
  const classes = useStyles()

  return (
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
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {companies.companyName}
        </Typography>
        <Typography align="center" color="textSecondary" variant="body1">
          {companies.points} Poäng
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box display="flex" style={{ padding: 15, paddingLeft: 10 }}>
        <InstagramIcon style={{ fontSize: 30, marginRight: 10 }} />
        <Link
          to={{ pathname: `https://www.${companies.instagram}` }}
          target="_blank"
          className={classes.root}
        >
          <Typography color="textSecondary" display="block" variant="body2">
            {companies.instagram}
          </Typography>
        </Link>
      </Box>
    </Card>
  )
}

export default CompanyCard
