import React, { useEffect, useState } from 'react';
import { Card, Box, CardContent, Typography, Grid, CardMedia, CardActionArea, Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firstCustomerImg from '../assets/badge_first_customer.png';
import twoKpoints from '../assets/badge_2000_points.png';
import cooperation from '../assets/badge_cooperation.png';
import firstHundredKronor from '../assets/badge_first_hundred_kronor.png';
import StarBorder from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Close from '@material-ui/icons/Close';
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
    paddingBottom: '24px',
    paddingLeft: 10,
    paddingRight: 10,
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
  },
  dialogBannerCheck: {
    fill:'white',
  },
  dialogTitle: {
    textTransform: 'uppercase',
    fontWeight: 600,
    color: '#96CB3C',
    paddingTop: 20,
    paddingBottom: 20,
  },
  descriptionText: {
    color: 'black'
  },
  dialogBanner: {
    width: '100%',
    backgroundColor: '#313230',
    padding: '20px',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogBoxContent: {
    padding: '30px',
    paddingBottom: '15px'
  },
  DialogBannerText: {
    color: 'white',
    fontWeight: 600,
    width: 'auto',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0
  },
  paper: { borderRadius: 20 }
});

const DialogBox = (props) => {
  const classes = useStyles();
  const { handleOpenDialog, handleCloseDialog, handleBannerClick, dialogObj: { text, img, descriptionText, completed }} = props;
  return (

    <Dialog
    classes={{
      paper: classes.paper
    }}
    onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={handleOpenDialog}>
      <Close style={{ position: 'absolute', top: 20, right: 20 }} fontSize="large" onClick={handleCloseDialog}/>
      <DialogContent className={classes.dialogBoxContent}>
        { img && (
          <CardMedia
          className={classes.dialogBoxImg}
          component="img"
          alt="first customer"
          image={img}
          title="First customer"
          />)}
        <Typography  variant="h4" className={classes.dialogTitle}>{text}</Typography>
        <DialogContentText className={classes.descriptionText}>{descriptionText}</DialogContentText>
      </DialogContent>
      <DialogContent className={classes.dialogBanner} style={{ backgroundColor: completed ? '#96CB3C' : '#313230' }} onClick={handleBannerClick}>
        {
          completed ? (
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <CheckCircle className={classes.dialogBannerCheck} fontSize="large"/>
            <DialogContentText  display="inline" className={classes.DialogBannerText} variant="h6">Jag har uppnåt detta mål!</DialogContentText>
            </Box>
          ) : (
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <CheckCircle className={classes.dialogBannerCheck} fontSize="large"/>
            <DialogContentText display="inline" className={classes.DialogBannerText} variant="h6">Klicka här om du har uppnåt målet</DialogContentText>
            <Star fontSize="large" className={classes.filledStar}/>
            </Box>
          )
        }
      </DialogContent>
    </Dialog>
  );
};


const Utmaning = ({ usedUser }) => {
  const classes = useStyles();
  const [company, setCompany] = useState({});
  const [dialogData, setDialogData] = useState({ open: false, dialogObj: null});
  const [cardData, setCardData] = useState([]);

  const handleOpenDialog = (dialogId) => {
    setDialogData({ open: true, dialogId });
  };

  const handleCloseDialog = () => {
    setDialogData({ open: false, dialogId: null });
  };

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
      const { challenges } = companyData;
      setCardData(
        [
          { id: 0, text: challenges[0].text , img: firstCustomerImg, completed: challenges[0].completed, descriptionText: challenges[0].descriptionText},
          { id: 1, text: challenges[1].text, img: firstHundredKronor , completed: challenges[1].completed, descriptionText: challenges[1].descriptionText},
          { id: 2, text: challenges[2].text, img: cooperation, completed: challenges[2].completed, descriptionText: challenges[2].descriptionText},
          { id: 3, text: challenges[3].text, img: twoKpoints, completed: challenges[3].completed, descriptionText: challenges[3].descriptionText},
          { id: 4, text: challenges[4].text, img: null, completed: challenges[4].completed, descriptionText: challenges[4].descriptionText},
          { id: 5, text: challenges[5].text, img: null, completed: challenges[5].completed, descriptionText: challenges[5].descriptionText},
          { id: 6, text: challenges[6].text, img: null, completed: challenges[6].completed, descriptionText: challenges[6].descriptionText},
          { id: 7, text: challenges[7].text, img: null, completed: challenges[7].completed, descriptionText: challenges[7].descriptionText},
        ]
      )
    })();
  }, [usedUser]);

  const handleCardPress = (ind) => setDialogData({ open: true, dialogObj: cardData.find((el) => el.id === ind) });
  const handleBannerClick = async (ind) => {
    const foundCard = cardData.find((el) => el.id === ind);
    foundCard.completed = true;
    setDialogData({ open: true, dialogObj: foundCard });
    const companyRef = firebase.firestore()
    .collection('companies')
    .doc(usedUser.companies[0].companyId);

    const dataExists = await companyRef.get();
    const companyChallengesData = dataExists.data().challenges;
    const foundChallenge = companyChallengesData.find((el) => el.id === ind);
    foundChallenge.completed = true;

    await companyRef.set({
      challenges: companyChallengesData,
  }, { merge: true }).catch(error => {
      console.log(error, 'error message')
  });
  };

  return (
    <>
      <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h4" align="center" className={classes.cardTitle}>
              Utmaning
            </Typography>
            <Grid container spacing={3} className={classes.gridContainer} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={12}>
                <Typography className={classes.utmaningDescriptionHeader}>32w
                  vi utmanar dig
                  </Typography>
                <Typography className={classes.utmaningDescription}>
                  Vi vet att du utmanar dig själv bara genom att vara med i Framtidens Företagare. Nu vill vu utmana dig! Vi har samlat ihop åtta utmaningar till dig - vissa är svårare än andra
                  </Typography>
              </Grid>
              {
                cardData.map(({ id, text, img, completed }, i) => {
                  return (
                  <Grid item xs={12} sm={6} md={6} lg={3} key={id}>
                    <CardActionArea className={classes.gridCard} elevation={2} onClick={() => handleCardPress(i)}>
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
      {
        dialogData.open && (
          <DialogBox handleOpenDialog={handleOpenDialog} handleCloseDialog={handleCloseDialog} handleBannerClick={async () => handleBannerClick(dialogData.dialogObj.id)} {...dialogData}/>
        )
      }
      </>
  )
}

export default Utmaning
