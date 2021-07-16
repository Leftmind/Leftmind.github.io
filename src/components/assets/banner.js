import {
    Box,
    Container,
    Grid,
    Typography
  } from '@material-ui/core';
  import { makeStyles } from '@material-ui/core/styles';
  import '../../index.css';



  const useStyles = makeStyles({
    root: {
      width: '100%',
      backgroundColor: '#f3f3f2',
    },
    cardTitle: {
      backgroundColor: '#96CB3C',
      padding: 10,
      color: 'white',
      fontWeight: '600',
      marginTop: 10,
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 30,
    },
  });

  export default function Banner({text}){
    const classes = useStyles();

    return(
        <Typography gutterBottom component="h1" align="center" className={classes.cardTitle}>
        {text}
      </Typography>
    )

  }


