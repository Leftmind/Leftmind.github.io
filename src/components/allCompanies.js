import {
  Box,
  Container,
  Grid,
} from '@material-ui/core';
import CompanyCard from './allCompanies/companyCard';
import { useState, useEffect } from 'react';
import { useAuth } from '../config/authProvider';
import { firebase } from "../config/fbConfig";
import { Alert as MuiAlert } from '@material-ui/lab';
import Banner from './assets/banner'
import Snackbar from '@material-ui/core/Snackbar';

const mockData =
[{
    id: 1,
    createdAt: '27/03/2019',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    media: './assets/grafikPattern.svg',
    title: 'Dropbox',
    totalDownloads: '594'
  },
  {
    id: 2,
    createdAt: '31/03/2019',
    description: 'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    media: '/static/images/products/product_2.png',
    title: 'Medium Corporation',
    totalDownloads: '625'
  }];

function CompanyList ({usedUser}) {

    const [ companies, setCompanies ] = useState([{}])
    
    useEffect(async () => {
        
        const allCompanies = [];
        await firebase.firestore().collection('companies').get()
          .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
            allCompanies.push(doc.data());
          })
        }).then( res => {
            console.log(allCompanies)
          setCompanies(allCompanies)
        });;

      }, []);
    
    
    if(companies.length < 1) return <div> no company </div>
    else

    console.log(companies)

    return(
  <>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {companies.map((company) => (
              <Grid
                item
                key={company.companyId}
                lg={4}
                md={6}
                xs={12}
              >
                <CompanyCard companies={company} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
        </Box>
      </Container>
    </Box>
  </>
)};

export default CompanyList;