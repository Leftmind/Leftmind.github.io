import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useHistory } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { firebase } from '../config/fbConfig'
import planetBackground from '../images/bakgrund.jpg'

const CssTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
    },
  },
})(TextField)

function Login() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [state, setState] = useState({
    email: '',
    password: '',
    errors: [],
    loading: false,
  })

  const history = useHistory()

  const handleChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setState({ loading: true })
    const userData = {
      email: state.email,
      password: state.password,
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((userCredential) => {
        const { user } = userCredential
        console.log(user, 'användare')
        setLoggedIn(true)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage, 'error')
      })
  }

  useEffect(() => {
    if (loggedIn) {
      history.push('/')
    }
  }, [loggedIn, history])

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
        <CssBaseline />
        <Box
          style={{
            padding: 30,
            backgroundColor: 'rgba(150, 203, 60, 0.5)',
            borderRadius: 20,
            margin: 30,
          }}
        >
          <Box
            style={{ marginBottom: 10 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <LockOutlinedIcon style={{ fontSize: 30, color: 'white' }} />
            <Typography variant="h4" style={{ color: 'white', marginLeft: 5 }}>
              Logga in
            </Typography>
          </Box>
          <form noValidate>
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Mailadress"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Lösenord"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              style={{ marginBottom: 10 }}
            />
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
                style={{ marginBottom: 20 }}
              >
                Logga in
              </Button>
              <Link href="signup" variant="body2">
                Har du inte ett konto? Skapa konto
              </Link>
            </Box>
          </form>
        </Box>
      </Grid>
    </div>
  )
}

export default Login
