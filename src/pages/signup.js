import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import withStyles from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
import { Redirect } from 'react-router-dom'
import { Alert as MuiAlert } from '@material-ui/lab'
import Snackbar from '@material-ui/core/Snackbar'

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

function Signup(props) {
  // const { signup } = useAuth()
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

  const [error, setError] = useState(false)
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

    console.log(newUserData, ' hallå?')

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <Typography align="center" component="h1" variant="h5">
          Skapa konto
        </Typography>
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
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
              <TextField
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
              <TextField
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
              <TextField
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
              <TextField
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
              <TextField
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
              <TextField
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
              <TextField
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
              <TextField
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
              <TextField
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Skapa Konto
            {loading && <CircularProgress size={30} />}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Har du redan ett konto? Logga in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={3000}>
          <Alert onClick={closeAlert} severity="error">
            Nåt gick fel, stämmer allt? {' '}
          </Alert>
        </Snackbar>
    </Container>
  )
}

export default withStyles(styles)(Signup)
