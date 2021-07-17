import React, { useState, useEffect } from 'react'
import { Box, Container, Grid } from '@material-ui/core'
import { Alert as MuiAlert } from '@material-ui/lab'
import Snackbar from '@material-ui/core/Snackbar'
import JoinCompany from './company/createOrJoinCompany'
import CreateCompany from './company/createCompany'
import AllMembers from './company/joinCompany'
import CompanyProfile from './company/companyProfile'
import { firebase } from '../config/fbConfig'
import { useAuth } from '../config/authProvider'

function Company({ usedUser }) {
  const hasCompany = 'companies' in usedUser
  const [joinOrCreate, setJoinOrCrate] = useState(false)
  const { user, loading, logout } = useAuth()

  const [open, setOpen] = useState(false)
  const [openError, setOpenError] = useState(false)

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }
  const closeAlert = () => {
    setOpen(false)
  }

  const closeErrorAlert = () => {
    setOpenError(false)
  }

  function handleChange(whatPage) {
    if (whatPage.create) setJoinOrCrate({ create: whatPage.create })
    else
      setJoinOrCrate({
        create: whatPage.create,
        companyName: whatPage.companyName,
      })
  }

  useEffect(() => {
    if (joinOrCreate) {
      if (!joinOrCreate.create && joinOrCreate.companyName) {
        try {
          firebase
            .firestore()
            .collection('companies')
            .where('companyName', '==', joinOrCreate.companyName)
            .get()
            .then((querySnapshot) => {
              console.log('WTF IM HERE')
              if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                  firebase
                    .firestore()
                    .collection('companies')
                    .doc(doc.data().companyId)
                    .update({
                      members: firebase.firestore.FieldValue.arrayUnion({
                        admin: false,
                        userId: user.uid,
                        pending: true,
                        firstName: usedUser.firstName,
                        lastName: usedUser.lastName,
                      }),
                    })
                })
              } else {
                console.log('did not found')
              }

              console.log('success, do alert here')
            })
        } catch (error) {
          console.log(error, 'fb error')
        }
      }
    }
  }, [joinOrCreate, usedUser.firstName, user.uid, usedUser.lastName])

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
      }}
    >
      <Container>
        <Grid container spacing={3}>
          {!hasCompany && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <JoinCompany join={false} onChange={handleChange} />
            </Grid>
          )}
          {!hasCompany && (
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <CreateCompany />
            </Grid>
          )}
          {hasCompany && (
            <Container maxWidth="lg">
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} xl={12} xs={12}>
                  <CompanyProfile usedUser={usedUser} />
                </Grid>
              </Grid>
            </Container>
          )}
          {hasCompany && (
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <AllMembers usedUser={usedUser} />
            </Grid>
          )}
        </Grid>
      </Container>
      <Snackbar open={open} autoHideDuration={3000}>
        <Alert onClick={closeAlert} severity="success">
          Förfrågan skickad!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={3000}>
        <Alert onClick={closeErrorAlert} severity="error">
          Något gick fel, kanske fel företagsnamn?
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Company
