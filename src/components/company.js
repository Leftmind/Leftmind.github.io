import React, { useState, useEffect } from 'react'
import { Container, Grid } from '@material-ui/core'
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
  const [joinOrCreate, setJoinOrCrate] = useState('')
  const { user, loading, logout } = useAuth()

  const [open, setOpen] = useState(false)
  const [openError, setOpenError] = useState(false)
  const [forceCheck, setForceCheck] = useState(false)

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
    else {
      setJoinOrCrate({
        create: whatPage.create,
        companyName: whatPage.companyName,
      })
    }

    console.log(whatPage, 'what Page')
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
                console.log('did found and go well')
                setOpen(true)
              } else {
                console.log('did not found')
                setOpenError(true)
              }
            })
        } catch (error) {
          console.log(error, 'fb error')
        }
      }
    }
  }, [joinOrCreate, usedUser.firstName, user.uid, usedUser.lastName])

  return (
    <Container>
      <Grid container spacing={3}>
        {hasCompany ? (
          <>
            <Grid item xs={12}>
              <CompanyProfile usedUser={usedUser} />
            </Grid>
            <Grid item xs={12}>
              <AllMembers usedUser={usedUser} />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <JoinCompany join={false} onChange={handleChange} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <CreateCompany />
            </Grid>
          </>
        )}
      </Grid>
      <Snackbar open={open} autoHideDuration={3000}>
        <Alert onClick={closeAlert} severity="success">
          Förfrågan skickad! Nu är det bara att vänta
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={3000}>
        <Alert onClick={closeErrorAlert} severity="error">
          Hittade inte företaget, se till att allt står rätt!
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Company
