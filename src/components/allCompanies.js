import React, { useState, useEffect } from 'react'
import { Box, Container, Grid } from '@material-ui/core'

import CompanyCard from './allCompanies/companyCard'
import { firebase } from '../config/fbConfig'

function CompanyList({ usedUser }) {
  const [companies, setCompanies] = useState([{}])

  useEffect(async () => {
    const allCompanies = []
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
        console.log(allCompanies)
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3,
            }}
          ></Box>
        </Container>
      </Box>
    </>
  )
}

export default CompanyList
