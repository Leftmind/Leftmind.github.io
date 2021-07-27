import React, { useState, useEffect } from 'react'
import { Box, Container, Grid } from '@material-ui/core'

import CompanyCard from './allCompanies/companyCard'
import { firebase } from '../config/fbConfig'

function CompanyList({ usedUser }) {
  const [companies, setCompanies] = useState([{}])

  useEffect(async () => {
    let allCompanies = []
    await firebase
      .firestore()
      .collection('companies')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          allCompanies.push(doc.data())
        })
      })
      .then((res) => {
        allCompanies.forEach((e) => {
          let expenses = 0
          let profits = 0
          let challengePoints = 0
          if (e.expenses.length >= 1) {
            expenses = e.expenses
              .map((item) => item.transactionAmount)
              .reduce((prev, next) => +prev + +next)
          }
          if (e.profits.length >= 1) {
            profits = e.profits
              .map((item) => item.transactionAmount)
              .reduce((prev, next) => +prev + +next)
          }

          e.challenges.forEach((c) => {
            if (c.id == 0 || c.id == 1 || c.id == 2 || c.id == 3) {
              if (c.completed) challengePoints += 20
            } else if (c.completed) challengePoints += 10
          })

          if (profits - expenses > 0) {
            e.points = Math.round((profits - expenses) / 50) + challengePoints
          } else {
            e.points = challengePoints
          }
        })

        allCompanies = allCompanies.sort(function (a, b) {
          return b.points - a.points
        })

        console.log(allCompanies, 'this is the total points')

        setCompanies(allCompanies)
      })
  }, [])

  if (companies.length < 1) return <div> no company </div>
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {companies.map((company) => (
                <Grid item key={company.companyId} lg={4} md={6} xs={12}>
                  <CompanyCard companies={company} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default CompanyList
