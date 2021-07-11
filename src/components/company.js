import {
    Box,
    Container,
    Grid
  } from '@material-ui/core';
  import JoinCompany from './company/createOrJoinCompany';
  import { useState, useEffect } from 'react';
  import CreateCompany from './company/createCompany'
  import AllMembers from './company/joinCompany'
  import CompanyProfile from './company/companyProfile'
  import { firebase } from "../config/fbConfig";
  import { useAuth } from '../config/authProvider';

//   import LatestOrders from 'src/components/dashboard//LatestOrders';
//   import LatestProducts from 'src/components/dashboard//LatestProducts';
//   import Sales from 'src/components/dashboard//Sales';
//   import TasksProgress from 'src/components/dashboard//TasksProgress';
//   import TotalCustomers from 'src/components/dashboard//TotalCustomers';
//   import TotalProfit from 'src/components/dashboard//TotalProfit';
//   import TrafficByDevice from 'src/components/dashboard//TrafficByDevice';

  function Company ({usedUser}) {
    const hasCompany = 'companies' in usedUser;
    const [joinOrCreate, setJoinOrCrate] = useState(false);
    const { user, loading, logout } = useAuth();

    function handleChange(whatPage) {

        console.log(whatPage, ' this is page')
        if(whatPage.create) setJoinOrCrate({create : whatPage.create});
        else setJoinOrCrate({create : whatPage.create, companyName : whatPage.companyName})
    }

    useEffect(() => {
        if(joinOrCreate){
            if(!joinOrCreate.create && joinOrCreate.companyName){

              try {
                firebase.firestore()
                .collection('companies')
                .where('companyName', '==', joinOrCreate.companyName)
                .get()
                .then((querySnapshot) => {
                  console.log('WTF IM HERE');
                  if (!querySnapshot.empty) {
                    console.log('not empty *****************************');
                    querySnapshot.forEach((doc) => {
                      console.log(doc.data().companyId, ' the id');
                      firebase.firestore()
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
                        });
                    });
                } else {
                    console.log('did not found')
                }

                console.log('success, do alert here')
            })
              } catch (error) {
                console.log(error,'fb error')
              }

            }
        }
    }, [joinOrCreate, usedUser.firstName, user.uid, usedUser.lastName]);

    return(
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
        {!hasCompany &&
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <JoinCompany join={false} onChange={handleChange}/>
          </Grid>
        }
        {!hasCompany &&
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <CreateCompany />
          </Grid>
        }
          {hasCompany &&
                <Container maxWidth="lg">
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        lg={8}
                        md={12}
                        xs={12}
                    >
                        <CompanyProfile usedUser={usedUser} />
                    </Grid>
                </Grid>
            </Container>
        }
        {hasCompany &&
                    <Grid
                    item
                    lg={8}
                    md={12}
                    xl={9}
                    xs={12}
                  >
                    <AllMembers usedUser={usedUser}/>
                  </Grid>
        }
          </Grid>
        </Container>
      </Box>
    )
  };

  export default Company;
