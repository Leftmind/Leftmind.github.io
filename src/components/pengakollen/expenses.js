import moment from 'moment';
import { v4 as uuid } from 'uuid';
import * as React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useState, useEffect } from 'react';

import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  IconButton,
  Grid,
  TextField
} from '@material-ui/core';
import FormDialog from './expensePopup'
import { firebase } from "../../config/fbConfig";
import { useAuth } from '../../config/authProvider';
import { Alert as MuiAlert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';



import AddCircleIcon from '@material-ui/icons/AddCircle';


import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';



const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },
  trashIcon: {
    '& svg': {
      fontSize: 35,
    },
  },
}));

const Expenses = ({ usedUser, expense }) => {

  console.log(expense, 'this is expenses')
  const expenseOrProfit = expense;

  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState({
    facebook: '-',
    instagram: '-',
  });
  const [state, setState] = useState({
    sum: '',
    comment: '',
    expenseOrProfit: expenseOrProfit,
  });
  const [userInfo, setUserInfo] = useState("");

  const handleClick = () => {
    setOpen(!open);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const closeAlert = () => {
    setOpen(false);
  };

  const handleChange = (event) => {

    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));

  };

  function sendExpense() {
    handleSubmit('Expense')
  }
  function sendProfit() {
    handleSubmit('Profit')
  }

  async function handleSubmit(event) {

    console.log(userInfo, 'this is the user info')
    console.log(user.uid, ' this is the uid')

    if (event === 'Expense' && state.expenseOrProfit) {
      await firebase.firestore().collection('companies').doc(company.companyId).set({
        expenses: firebase.firestore.FieldValue.arrayUnion(
          {
            comment: state.comment,
            transactionAmount: state.sum,
            transactionId: Math.random(),
            timestamp: new Date(),
          })
      }, { merge: true }).then(res => {
        setOpen(true);
      }).catch(error => {
        console.log(error, 'error message')
      });
    }
    else {
      await firebase.firestore().collection('companies').doc(company.companyId).set({
        profits: firebase.firestore.FieldValue.arrayUnion(
          {
            comment: state.comment,
            transactionAmount: state.sum,
            transactionId: Math.random(),
            timestamp: new Date(),
          })
      }, { merge: true }).then(res => {
        setOpen(true);
      }).catch(error => {
        console.log(error, 'error message')
      });
    }
  };

  useEffect(async () => {
    setUserInfo(usedUser)

    const userDocRef = firebase.firestore().collection('companies').doc(usedUser.companies[0].companyId);
    const dataExists = await userDocRef.get();

    const companyData = dataExists.data();
    companyData.expenses.sort(function (x, y) {
      return y.timestamp - x.timestamp;
    })
    companyData.profits.sort(function (x, y) {
      return y.timestamp - x.timestamp;
    })

    setCompany(companyData);

  }, []);

  if (!company.website) return null
  else
    return (
      <Card>
        <CardHeader title={expense ? "Utgifter" : "Inkomster"}
          subheader={expense ? 'Här skriver du in dina utgifter' : 'Här skriver du in dina inkomster'}
        />
        <Grid
          container
          spacing={3}
          style={{ padding: 5 }}
        >
          <Grid
            item
            lg={4}
            md={4}
            xl={4}
            xs={12}
          >
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Summa"
              name="sum"
              autoComplete="sum"
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            xl={4}
            xs={12}
          >
            <TextField
              variant="outlined"
              required
              fullWidth
              label="kommentar"
              name="comment"
              autoComplete="comment"
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            xl={4}
            xs={12}
          >
            <IconButton style={{ padding: 0 }} onClick={expenseOrProfit ? sendExpense : sendProfit}>
              <AddCircleIcon fontSize='large' />
            </IconButton>
          </Grid>
        </Grid>
        <Divider />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Summa
              </TableCell>
                  <TableCell sortDirection="desc">
                    Datum
                </TableCell>
                  <TableCell>
                    Ändra
              </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {expenseOrProfit ?
                  company.expenses.map((order, i) => {
                    const date = new Date(order.timestamp.seconds);
                    return (
                      <TableRow
                        hover
                        key={order.transactionId}
                      >
                        <TableCell>
                          {order.transactionAmount} Sek
                        </TableCell>
                        <TableCell>
                          {moment(date * 1000).format('YYYY-MM-DD')}
                        </TableCell>
                        <TableCell>
                          <FormDialog order={order} company={company} expenseOrProfit={expenseOrProfit} />
                        </TableCell>
                      </TableRow>
                    )
                  })
                  :
                  company.profits.map((order, i) => (
                    <TableRow
                      hover
                      key={order.transactionid}
                    >
                      <TableCell>
                        {order.transactionAmount} Sek
                      </TableCell>
                      <TableCell>
                        {moment(order.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        <FormDialog order={order} company={company} expenseOrProfit={expenseOrProfit} />
                      </TableCell>
                    </TableRow>
                  ))
                }

              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Snackbar open={open} autoHideDuration={3000}>
          <Alert onClick={closeAlert} severity="success">
            Ny utgift/inkomst tillagd!{' '}
          </Alert>
        </Snackbar>
      </Card>
    )
};

export default Expenses;