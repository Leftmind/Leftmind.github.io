import React, { useState, useEffect } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from '@material-ui/core'
import { Alert as MuiAlert } from '@material-ui/lab'
import Snackbar from '@material-ui/core/Snackbar'
import { firebase } from '../../config/fbConfig'
import { useAuth } from '../../config/authProvider'
import Banner from '../assets/banner'
import UploadImage from '../UploadImage'

const storage = firebase.storage()

const AccountProfileDetails = ({ usedUser }) => {
  const savedUserImage = usedUser.userImage ? usedUser.userImage : null
  const [open, setOpen] = useState(false)
  const [userInfo, setUserInfo] = useState({ ...usedUser })
  const [file, setFile] = useState(null)
  const [userImage, setUserImage] = useState(savedUserImage)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const onFileChange = (e) => setFile(e.target.files[0])

  const uploadUserImage = async () => {
    setLoading(true)
    const storageRef = storage.ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    const uploadedImage = await fileRef.getDownloadURL()

    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .set(
        {
          userImage: uploadedImage,
        },
        { merge: true },
      )
      .catch((error) => {
        console.log(error, 'error message')
      })

    setUserImage(uploadedImage)
    setLoading(false)
  }

  useEffect(() => {
    if (file) {
      uploadUserImage()
    }
  }, [file])

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }
  const closeAlert = () => {
    setOpen(false)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    console.log(userInfo, ' this is the userinfo')

    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .set(
        {
          email: userInfo.email,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          phoneNumber: userInfo.phoneNumber,
          school: userInfo.school,
          municipality: userInfo.municipality,
          zipCode: userInfo.zipCode,
          adress: userInfo.adress,
        },
        { merge: true },
      )
      .then(() => setOpen(true))
      .catch((error) => {
        console.log(error, 'error message')
      })
  }

  const handleChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <Banner text="Min Profil" />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <UploadImage
            loading={loading}
            uploadedImage={userImage}
            onFileChange={onFileChange}
            profil
          />
        </Grid>
        <CardHeader
          subheader="Du kan ändra informationen här"
          title="Profil"
          style={{ marginTop: 10, marginBottom: 10 }}
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="förnamn"
                name="firstName"
                onChange={handleChange}
                required
                value={userInfo.firstName}
                disabled
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Efternamn"
                name="lastName"
                onChange={handleChange}
                required
                value={userInfo.lastName}
                disabled
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Mailadress"
                name="email"
                onChange={handleChange}
                required
                disabled
                value={userInfo.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Telefonnummer"
                name="phone"
                onChange={handleChange}
                value={userInfo.phoneNumber}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="kommun"
                name="municipality"
                onChange={handleChange}
                required
                value={userInfo.municipality}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Adress"
                name="adress"
                onChange={handleChange}
                required
                value={userInfo.adress}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Skola"
                name="school"
                onChange={handleChange}
                required
                value={userInfo.school}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Postnummer"
                name="zipCode"
                onChange={handleChange}
                required
                value={userInfo.zipCode}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          xs={12}
          style={{
            padding: 20,
            paddingBottom: 20 + 12, // padding + bottom padding from the text boxes above so that the space above and below the button looks equal
          }}
        >
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Spara
          </Button>
        </Grid>

        <Snackbar open={open} autoHideDuration={3000}>
          <Alert onClick={closeAlert} severity="success">
            Profil uppdaterad!{' '}
          </Alert>
        </Snackbar>
      </Card>
    </form>
  )
}

export default AccountProfileDetails
