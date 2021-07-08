import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import FaceIcon from '@material-ui/icons/Face';
import React, { Component, useState, useEffect } from 'react';
import { firebase } from "../../config/fbConfig";
import { useAuth } from '../../config/authProvider';
import CheckIcon from '@material-ui/icons/Check';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { makeStyles } from '@material-ui/core/styles';



const products = [
  {
    id: 1,
    name: 'Dropbox',
    imageUrl: FaceIcon,
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: 2,
    name: 'Medium Corporation',
    imageUrl: '/static/images/products/product_2.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: 3,
    name: 'Slack',
    imageUrl: '/static/images/products/product_3.png',
    updatedAt: moment().subtract(3, 'hours')
  }
];

function AllMembers ({usedUser}) {


    const { user, loading, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [company, setCompany] = useState(false);
    const [userInfo, setUserInfo] = useState(false);
    const [members, setMembers] = useState(false)

    async function acceptMember(e){
        const userToJoinid = e;

        console.log(e, ' event här?')

        const companyRef = await firebase.firestore()
        .collection('companies')
        .where('companyId', '==', company.companyId)
        .get()

        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              console.log('here is the doc', doc);
              console.log(doc.data(), 'data doc')
              doc.data().members.forEach((member) => {
                console.log('heres a member', member);

                if (member.userId == userToJoinid && member.pending == true) {
                  console.log(member, 'the member met the criteria');
                
                firebase.firestore().collection('companies').doc(doc.data().companyId).set({
                      members: firebase.firestore.FieldValue.arrayUnion({ admin: false, firstName: member.firstName, lastName: member.lastName, pending: false, userId: userToJoinid})
                  }, { merge: true });

                firebase.firestore().collection('companies').doc(doc.data().companyId).set({
                    members: firebase.firestore.FieldValue.arrayRemove({ admin: false, firstName: member.firstName, lastName: member.lastName, pending: true, userId: userToJoinid})
                }, { merge: true });

                console.log(doc.data().userId, doc.data().companyName, userToJoinid, ' all things')

                firebase.firestore()
                .collection('users')
                .doc(userToJoinid)
                .set(
                  {
                    companies: [{ companyId: doc.data().companyId, companyName: doc.data().companyName }],
                  },
                  { merge: true },
                );

                }
              });
            });
            console.log('works')
          } else {
            console.log('did not work')
          }
        });
    }

    useEffect(async () => {
        setUserInfo(usedUser)
        console.log(userInfo, 'från account profile page')

        const userDocRef = firebase.firestore().collection('companies').doc(usedUser.companies[0].companyId);
        const dataExists = await userDocRef.get();
        setCompany(dataExists.data());

        console.log(company);
        console.log(dataExists.data().members, 'company data');
        setMembers(dataExists.data().members)

    }, []);

if(!members) return null
else
   return ( 
  <Card>
    <CardHeader
      subtitle={`${products.length} in total`}
      title="Alla medlemmar"
    />
    <Divider />
    <List>
      {members.map((member, i) => (
        <ListItem
          divider={i < member.length - 1}
          key={member.userId}
        >
          <ListItemAvatar>
            <FaceIcon />
          </ListItemAvatar>
          <ListItemText
            primary={member.firstName + " " + member.lastName} 
            secondary={member.admin ? "Status: Admin" :
            member.pending ? "Status : Inväntar godkännande" : 
            "Status: Medlem"
            }
          />
          {member.pending ?
          <>
            <IconButton
            edge="end"
            size="small">
            <HighlightOffIcon />
          </IconButton>   
          <IconButton
            edge="end"
            size="small"
            onClick={() => acceptMember(member.userId)}
          >
            <CheckIcon />
          </IconButton> 
          </>
          :
        null
            }
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
    </Box>
  </Card>
   )
}

export default AllMembers;