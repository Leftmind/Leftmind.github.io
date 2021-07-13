import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CardMedia, Box, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firstCustomerImg from '../assets/badge_first_customer.png';
import twoKpoints from '../assets/badge_2000_points.png';
import cooperation from '../assets/badge_cooperation.png';
import firstHundredKronor from '../assets/badge_first_hundred_kronor.png';
import StarBorder from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import { firebase } from "../config/fbConfig";

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
    height: '100%',
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
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
  filledStar: {
    fill:"#ede21b",
  }
});

function Utmaning({ usedUser }) {
  const classes = useStyles();
  const [company, setCompany] = useState({});
  const [cardData, setCardData] = useState([
    { text: 'min första kund' , img: firstCustomerImg, completed: false},
    { text: 'första hundralappen', img: firstHundredKronor , completed: false},
    { text: 'samarbets med andra' , img: cooperation, completed: false},
    { text: 'tjäna 2000kr', img: twoKpoints, completed: false},
    { text: 'företagslogga', img: null, completed: false},
    { text: 'instagramkonto', img: null, completed: false},
    { text: 'facebookkonto', img: null, completed: false},
    { text: 'gör en annons', img: null, completed: false},
  ])

  const companyHasEarned2k = (profitsArr) => {
    const totalEarnings = profitsArr.reduce((acc, el) => {
      acc += el.transactionAmount
      return acc;
    }, 0);

    return totalEarnings >= 2000;
  };

  useEffect(() => {
    const userDocRef = firebase.firestore().collection('companies').doc(usedUser.companies[0].companyId);
    (async () => {
      const dataExists = await userDocRef.get();
      const companyData = dataExists.data();
      setCompany(companyData);
      setCardData(
        [
          { text: 'min första kund' , img: firstCustomerImg, completed: false},
          { text: 'första hundralappen', img: firstHundredKronor , completed: false},
          { text: 'samarbets med andra' , img: cooperation, completed: companyData.members.length > 0},
          { text: 'tjäna 2000kr', img: twoKpoints, completed: companyHasEarned2k(companyData.profits)},
          { text: 'företagslogga', img: null, completed: false},
          { text: 'instagramkonto', img: null, completed: companyData.instagram !== ""},
          { text: 'facebookkonto', img: null, completed: companyData.facebook !== ""},
          { text: 'gör en annons', img: null, completed: false},
        ]
      )
    })();
}, [usedUser]);

useEffect(() => {

  console.log("******\nDATA\n******: Utmaning -> company", company)
}, [company])
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
                cardData.map(({ text, img, completed }) => {
                  return (
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <CardActionArea className={classes.gridCard} elevation={2}>
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
                          { completed ? <Star fontSize="large" className={classes.filledStar}/> : <StarBorder fontSize="large" />}
                        </Box>
                      </CardContent>
                    </CardActionArea>
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
