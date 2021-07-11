import React from 'react';
import { Card, CardContent, Typography, Grid, CardMedia, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firstCustomerImg from '../assets/badge_first_customer.png';
import twoKpoints from '../assets/badge_2000_points.png';
import cooperation from '../assets/badge_cooperation.png';
import firstHundredKronor from '../assets/badge_first_hundred_kronor.png';
import StarBorder from '@material-ui/icons/StarBorder';

const cardData = [
  { text: 'min första kund' , img: firstCustomerImg},
  { text: 'första hundralappen', img: firstHundredKronor },
  { text: 'samarbets med andra' , img: cooperation},
  { text: 'tjäna 2000kr', img: twoKpoints},
  { text: 'företagslogga', img: null},
  { text: 'instagramkonto', img: null},
  { text: 'facebookkonto', img: null},
  { text: 'gör en annons', img: null},
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: '#f3f3f2',
  },
  cardTitle: {
    backgroundColor: '#96CB3C',
    padding: 20,
    color: 'white',
    fontWeight: '600',
  },
  cardContent: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  gridContainer: {
    padding: '16px',
    paddingBottom: '24px'
  },
  utmaningCardTitle: {
    textTransform: 'uppercase',
    fontWeight: '600',
    paddingTop: 20,
    paddingBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: '50%'
  },
  gridCard: {
    height: '100%'
  },
  cardContentContainer: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  iconHolder: {
    width: '100%',
    textAlign: 'center'
  },
  utmaningDescriptionHeader: {
    textTransform: 'uppercase',
    fontWeight: 600,
    width: '100%',
    textAlign: 'center',
  },
  utmaningDescription: {
    width: '100%',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: 20,
    paddingBottom: 20,
  },
});

function Utmaning({ usedUser }) {
  const classes = useStyles();
  return (
      <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom component="h1" align="center" className={classes.cardTitle}>
              Utmaning
            </Typography>
            <Grid container spacing={3} className={classes.gridContainer} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={12}>
                <Typography className={classes.utmaningDescriptionHeader}>
                  vi utmanar dig
                  </Typography>
                <Typography className={classes.utmaningDescription}>
                  Vi vet att du utmanar dig själv bara genom att vara med i Framtidens Företagare. Nu vill vu utmana dig! Vi har samlat ihop åtta utmaningar till dig - vissa är svårare än andra
                  </Typography>
              </Grid>
              {
                cardData.map(({ text, img }) => {
                  return (
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Card className={classes.gridCard}>
                      <CardContent className={classes.cardContentContainer}>
                      { img &&
                      (<CardMedia
                        className={classes.cardImage}
                        component="img"
                        alt="first customer"
                        image={img}
                        title="First customer"
                      />)
                      }
                        <Typography component="h2" align="center" className={classes.utmaningCardTitle}>
                        {text}
                        </Typography>
                        <Box className={classes.iconHolder}>
                          <StarBorder fontSize="large" className={classes.starIcon}/>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  );
                })
              }
            </Grid>
          </CardContent>
      </Card>
  )
}

export default Utmaning
