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
import { useAuth } from '../../config/authProvider'
import { firebase } from '../../config/fbConfig'
import Banner from '../assets/banner'
import UploadImage from '../UploadImage'

const storage = firebase.storage()

const AccountProfileDetails = ({ usedUser }) => {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(false)
  const [company, setCompany] = useState({
    facebook: '-',
    instagram: '-',
    website: '-',
  })
  const [companyImage, setCompanyImage] = useState(null)
  const [userInfo, setUserInfo] = useState('')
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
      .collection('companies')
      .doc(usedUser.companies[0].companyId)
      .set(
        {
          companyImage: uploadedImage,
        },
        { merge: true },
      )
      .catch((error) => {
        console.log(error, 'error message')
      })

    setCompanyImage(uploadedImage)
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

    await firebase
      .firestore()
      .collection('companies')
      .doc(company.companyId)
      .set(
        {
          facebook: company.facebook,
          instagram: company.instagram,
          website: company.website,
        },
        { merge: true },
      )
      .then((res) => setOpen(true))
      .catch((error) => {
        console.log(error, 'error message')
      })
  }

  useEffect(() => {
    setUserInfo(usedUser)
    const userDocRef = firebase
      .firestore()
      .collection('companies')
      .doc(usedUser.companies[0].companyId)
    ;(async () => {
      const dataExists = await userDocRef.get()
      setCompany(dataExists.data())
      setCompanyImage(dataExists.data().companyImage)
    })()
  }, [usedUser])

  const handleChange = (event) => {
    setCompany({
      ...company,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <Banner text="Mitt Företag" />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <UploadImage
            loading={loading}
            uploadedImage={companyImage}
            onFileChange={onFileChange}
            company
          />
        </Grid>
        <CardHeader
          subheader={company.bio}
          title={company.companyName}
          style={{ paddingTop: 20, paddingBottom: 20 }}
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Instagram"
                name="instagram"
                onChange={handleChange}
                required
                value={company.instagram}
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="företagets facebook"
                name="facebook"
                onChange={handleChange}
                required
                value={company.facebook}
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Företagets hemsida"
                name="website"
                onChange={handleChange}
                required
                value={company.website}
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
          style={{ padding: 20 }}
        >
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Spara
          </Button>
        </Grid>

        <Snackbar open={open} autoHideDuration={3000}>
          <Alert onClick={closeAlert} severity="success">
            Företagsinformation uppdaterad!{' '}
          </Alert>
        </Snackbar>
      </Card>
    </form>
  )
}

export default AccountProfileDetails
