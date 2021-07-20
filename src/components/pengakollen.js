/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  Grid,
  Container,
  Box,
  Typography,
} from '@material-ui/core'
import Expenses from './pengakollen/expenses'
import ExpenseAmountMoney from './pengakollen/expenseAmountMoney'
import { firebase } from '../config/fbConfig'
import Banner from './assets/banner'

const Pengakollen = ({ usedUser }) => {
  const hasCompany = 'companies' in usedUser
  const [userInfo, setUserInfo] = useState('')
  const [company, setCompany] = useState({
    facebook: '-',
    instagram: '-',
    website: '-',
  })

  useEffect(async () => {
    setUserInfo(usedUser)
    const userDocRef = firebase
      .firestore()
      .collection('companies')
      .doc(usedUser.companies[0].companyId)
    const dataExists = await userDocRef.get()
    setCompany(dataExists.data())
  }, [])


  if (!hasCompany)
    return (
      <Container>
        <Card
          style={{ background: 'white', paddingTop: 20, paddingBottom: 20 }}
        >
          <Typography align="center" variant="h4">
            Start or join a company first
          </Typography>
        </Card>
      </Container>
    )
  return (
    <Container style={{ marginBottom: 40 }}>
      <Card>
        <Banner text="Pengakollen" />
        <CardHeader
          subheader="Att hålla koll på ekonomin är viktigt. Pengar in (intäkter) och pengar ut (utgifter) berättar om ditt företags resultat - det vill säga hur mycket vinst eller förlust ditt företag går.
        ,,
          Glöm inte bort att bokföra varje köp eller försäljning. Avvara lite tid när din arbetsdag är över så har du stenkoll på din ekonomi under sommaren.
          "
          title="Håll koll på ekonomin!"
        />
      </Card>
      <Grid container spacing={3} style={{ marginTop: 10 }}>
        <Grid item xs={12} md={6}>
          <Expenses usedUser={usedUser} expense />
        </Grid>
        <Grid item xs={12} md={6}>
          <Expenses usedUser={usedUser} />
        </Grid>
        <Grid item xs={12}>
          <ExpenseAmountMoney usedUser={usedUser} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Pengakollen
