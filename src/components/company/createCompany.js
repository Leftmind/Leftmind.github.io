import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import withStyles from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
import { Card } from '@material-ui/core'
import { Alert as MuiAlert } from '@material-ui/lab'
import Snackbar from '@material-ui/core/Snackbar'
import { firebase } from '../../config/fbConfig'
import { useAuth } from '../../config/authProvider'
import goals from '../assets/goals'

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

function CreateCompany(props) {
  const { user, loading, logout } = useAuth()
  const [usedUser, setUserUser] = useState(false)
  const [open, setOpen] = useState(false)

  const [state, setState] = useState({
    bio: '',
    companyName: '',
    facebook: '',
    instagram: '',
    website: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }
  const closeAlert = () => {
    setOpen(false)
  }

  useEffect(async () => {
    if (user) {
      const userDocRef = firebase.firestore().collection('users').doc(user.uid)
      const dataExists = await userDocRef.get()
      setUserUser(dataExists.data())
    }
  }, [user])

  async function handleSubmit(event) {
    const newUserData = state
    console.log(newUserData, ' this is it ')

    event.preventDefault()

    const firestoreId = generateUniqueFirestoreId()
    console.log(goals(), 'all goals');

    await firebase
      .firestore()
      .collection('companies')
      .doc(firestoreId)
      .set({
        bio: newUserData.bio,
        companyName: newUserData.companyName,
        facebook: newUserData.facebook,
        instagram: newUserData.instagram,
        website: newUserData.website,
        companyId: firestoreId,
        members: [
          {
            admin: true,
            firstName: usedUser.firstName,
            lastName: usedUser.lastName,
            userId: user.uid,
            pending: false,
          },
        ],
        expenses: [],
        profits: [],
        challenges: goals(),
      })
      .then(() => {
        addCompanyToAccount(newUserData, firestoreId)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  async function addCompanyToAccount(userData, firestoreId) {
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .set(
        {
          companies: [
            { companyId: firestoreId, companyName: userData.companyName },
          ],
        },
        { merge: true },
      )

    setOpen(true)
  }

  return (
    <Card>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={styles.paper}>
          <Typography align="center" component="h1" variant="h5">
            Skapa Företag
          </Typography>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="companyName"
                  label="Företagets namn"
                  name="companyName"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="instagram"
                  label="Instagram"
                  name="instagram"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="facebook"
                  label="Facebook"
                  name="facebook"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="website"
                  label="Hemsida"
                  name="website"
                  pattern="[7-9]{1}[0-9]{9}"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="bio"
                  label="Affärsidé"
                  name="bio"
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
              style={{ marginTop: '10px', marginBottom: '10px' }}
            >
              Skapa företag
              {loading && <CircularProgress size={30} />}
            </Button>
            <Divider />
          </form>
        </div>

        <Snackbar open={open} autoHideDuration={3000}>
          <Alert onClick={closeAlert} severity="success">
            Företaget skapades! Grattis, nu är det bara att köra igång!
          </Alert>
        </Snackbar>
      </Container>
    </Card>
  )
}

function generateUniqueFirestoreId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let autoId = ''
  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return autoId
}

export default withStyles(styles)(CreateCompany)
