import React, { useState } from 'react'
import {
  Button,
  Box,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Divider,
  Snackbar,
} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { Redirect } from 'react-router-dom'
import { Alert as MuiAlert } from '@material-ui/lab'
import planetBackground from '../images/bakgrund.jpg'

import { firebase } from '../config/fbConfig'

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progess: {
    position: 'absolute',
  },
})

const CssTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
    },
  },
})(TextField)

function Signup() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [open, setOpen] = useState(false)

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }
  const closeAlert = () => {
    setOpen(false)
  }

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    school: '',
    email: '',
    municipality: '',
    adress: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
    errors: [],
    loading: false,
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const newUserData = state

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUserData.email, newUserData.password)
      .then(async (res) => {
        const user = await res.user
        await firebase.firestore().collection('users').doc(user.uid).set({
          email: newUserData.email,
          password: newUserData.password,
          firstName: newUserData.firstName,
          lastName: newUserData.lastName,
          phoneNumber: newUserData.phoneNumber,
          school: newUserData.school,
          municipality: newUserData.municipality,
          zipCode: newUserData.zipCode,
          adress: newUserData.adress,
        })
      })
      .then(() => setLoggedIn(true))
      .catch((error) => setOpen(true))
  }

  if (loggedIn) return <Redirect to="/" />

  return (
    <div
      style={{
        backgroundImage: `url(${planetBackground})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat-y',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100%',
        height: '100%',
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Box
          style={{
            padding: 10,
            paddingTop: 30,
            paddingBottom: 30,
            backgroundColor: 'rgba(150, 203, 60, 0.6)',
            borderRadius: 20,
            margin: 30,
          }}
        >
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={styles.paper}>
              <Typography
                align="center"
                variant="h4"
                style={{ color: 'white', marginBottom: 20 }}
              >
                Skapa konto
              </Typography>
              <form noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CssTextField
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="Förnamn"
                      name="firstName"
                      autoComplete="firstName"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CssTextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Efternamn"
                      name="lastName"
                      autoComplete="lastName"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CssTextField
                      variant="outlined"
                      required
                      fullWidth
                      id="school"
                      label="Skola"
                      name="school"
                      autoComplete="school"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CssTextField
                      variant="outlined"
                      required
                      fullWidth
                      id="phoneNumber"
                      label="Telefonnummer"
                      name="phoneNumber"
                      autoComplete="phoneNumber"
                      pattern="[7-9]{1}[0-9]{9}"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <CssTextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Mailadress"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <CssTextField
                      variant="outlined"
                      required
                      fullWidth
                      id="municipality"
                      label="Kommun"
                      name="municipality"
                      autoComplete="municipality"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <CssTextField
                      variant="outlined"
                      required
                      fullWidth
                      id="adress"
                      label="Gatuadress"
                      name="adress"
                      autoComplete="adress"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <CssTextField
                      variant="outlined"
                      required
                      fullWidth
                      id="zipcode"
                      label="Postnummer"
                      name="zipcode"
                      autoComplete="zipcode"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <CssTextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Lösenord"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      variant="outlined"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Repetera Lösenord"
                      type="password"
                      id="confirmPassword"
                      autoComplete="current-password"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Divider />
                <Box
                  style={{ padding: 20, paddingBottom: 10 }}
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    style={{
                      marginBottom: 20,
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    Skapa Konto
                    {loading && <CircularProgress size={30} />}
                  </Button>

                  <Link href="login" variant="body2">
                    Har du redan ett konto? Logga in
                  </Link>
                </Box>
              </form>
            </div>
            <Snackbar open={open} autoHideDuration={3000}>
              <Alert onClick={closeAlert} severity="error">
                Nåt gick fel, stämmer allt?{' '}
              </Alert>
            </Snackbar>
          </Container>
        </Box>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Signup)
