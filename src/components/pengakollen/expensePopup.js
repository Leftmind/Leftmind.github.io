/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import { Alert as MuiAlert } from '@material-ui/lab'
import Snackbar from '@material-ui/core/Snackbar'
import { IconButton } from '@material-ui/core'
import { firebase } from '../../config/fbConfig'

const FormDialog = ({
  order,
  company,
  expenseOrProfit,
  usedUser,
  setUpdatePage,
}) => {
  const [open, setOpen] = React.useState(false)
  const [openAlert, setOpenAlert] = React.useState(false)
  const [openAlertRemove, setOpenAlertRemove] = React.useState(false)

  const [state, setState] = useState({
    comment: '',
    user: usedUser.firstName,
  })

  const handleText = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClickOpenRemove = () => {
    setOpenAlertRemove(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }
  const closeAlert = () => {
    setOpenAlert(false)
  }

  async function handleChange(event) {
    if (expenseOrProfit) {
      await firebase
        .firestore()
        .collection('companies')
        .doc(company.companyId)
        .set(
          {
            expenses: firebase.firestore.FieldValue.arrayUnion({
              comment: state.comment,
              transactionAmount: order.transactionAmount,
              transactionId: order.transactionId,
              timestamp: order.timestamp,
            }),
          },
          { merge: true },
        )

      await firebase
        .firestore()
        .collection('companies')
        .doc(company.companyId)
        .set(
          {
            expenses: firebase.firestore.FieldValue.arrayRemove({
              comment: order.comment,
              transactionAmount: order.transactionAmount,
              transactionId: order.transactionId,
              timestamp: order.timestamp,
            }),
          },
          { merge: true },
        )
        .then((res) => {
          setUpdatePage(true)
          setOpenAlert(true)
        })
        .catch((error) => {
          console.log(error, 'error message')
        })
    } else {
      await firebase
        .firestore()
        .collection('companies')
        .doc(company.companyId)
        .set(
          {
            profits: firebase.firestore.FieldValue.arrayUnion({
              comment: state.comment,
              transactionAmount: order.transactionAmount,
              transactionId: order.transactionId,
              timestamp: order.timestamp,
            }),
          },
          { merge: true },
        )

      await firebase
        .firestore()
        .collection('companies')
        .doc(company.companyId)
        .set(
          {
            profits: firebase.firestore.FieldValue.arrayRemove({
              comment: order.comment,
              transactionAmount: order.transactionAmount,
              transactionId: order.transactionId,
              timestamp: order.timestamp,
            }),
          },
          { merge: true },
        )
        .then((res) => {
          setUpdatePage(true)
          console.log('success', res)
          setOpenAlert(true)
        })
        .catch((error) => {
          console.log(error, 'error message')
        })
    }
  }

  async function handleChange(event) {
    if (expenseOrProfit) {
      await firebase
        .firestore()
        .collection('companies')
        .doc(company.companyId)
        .set(
          {
            expenses: firebase.firestore.FieldValue.arrayUnion({
              comment: state.comment,
              transactionAmount: order.transactionAmount,
              transactionId: order.transactionId,
              timestamp: order.timestamp,
            }),
          },
          { merge: true },
        )

      await firebase
        .firestore()
        .collection('companies')
        .doc(company.companyId)
        .set(
          {
            expenses: firebase.firestore.FieldValue.arrayRemove({
              comment: order.comment,
              transactionAmount: order.transactionAmount,
              transactionId: order.transactionId,
              timestamp: order.timestamp,
            }),
          },
          { merge: true },
        )
        .then((res) => {
          setUpdatePage(true)
          setOpenAlert(true)
        })
        .catch((error) => {
          console.log(error, 'error message')
        })
    } else {
      await firebase
        .firestore()
        .collection('companies')
        .doc(company.companyId)
        .set(
          {
            profits: firebase.firestore.FieldValue.arrayUnion({
              comment: state.comment,
              transactionAmount: order.transactionAmount,
              transactionId: order.transactionId,
              timestamp: order.timestamp,
            }),
          },
          { merge: true },
        )

      await firebase
        .firestore()
        .collection('companies')
        .doc(company.companyId)
        .set(
          {
            profits: firebase.firestore.FieldValue.arrayRemove({
              comment: order.comment,
              transactionAmount: order.transactionAmount,
              transactionId: order.transactionId,
              timestamp: order.timestamp,
            }),
          },
          { merge: true },
        )
        .then((res) => {
          setUpdatePage(true)
          console.log('success', res)
          setOpenAlert(true)
        })
        .catch((error) => {
          console.log(error, 'error message')
        })
    }
    setOpen(false)
  }

  async function handleRemove(event) {
    if (expenseOrProfit) {
      await firebase
        .firestore()
        .collection('companies')
        .doc(company.companyId)
        .set(
          {
            expenses: firebase.firestore.FieldValue.arrayRemove({
              comment: order.comment,
              transactionAmount: order.transactionAmount,
              transactionId: order.transactionId,
              timestamp: order.timestamp,
            }),
          },
          { merge: true },
        )
        .then((res) => {
          setUpdatePage(true)
          setOpenAlertRemove(true)
        })
        .catch((error) => {
          console.log(error, 'error message')
        })
    } else {
      await firebase
        .firestore()
        .collection('companies')
        .doc(company.companyId)
        .set(
          {
            profits: firebase.firestore.FieldValue.arrayRemove({
              comment: order.comment,
              transactionAmount: order.transactionAmount,
              transactionId: order.transactionId,
              timestamp: order.timestamp,
            }),
          },
          { merge: true },
        )
        .then((res) => {
          console.log(res, ' this is the company back')
          setUpdatePage(true)
          setOpenAlertRemove(true)
        })
        .catch((error) => {
          console.log(error, 'error message')
        })
    }
    setOpen(false)
  }

  return (
    <div>
      <IconButton style={{ padding: 0 }}>
        <EditIcon onClick={handleClickOpen} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Kommentar</DialogTitle>
        <DialogContent>
          <DialogContentText>{order.comment}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={order.orderId}
            label="Ändra kommentar"
            name="comment"
            fullWidth
            onChange={handleText}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" id={order.orderId}>
            Avbryt
          </Button>
          <Button
            onClick={() => handleChange(order)}
            variant="contained"
            color="secondary"
            id={order.orderId}
          >
            Bekräfta ändring
          </Button>
          <Button
            onClick={() => handleRemove(order)}
            color="primary"
            id={order.orderId}
          >
            Radera
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openAlert} autoHideDuration={3000}>
        <Alert onClick={closeAlert} severity="success">
          Kommentar ändrad!{' '}
        </Alert>
      </Snackbar>
      <Snackbar open={openAlertRemove} autoHideDuration={3000}>
        <Alert onClick={handleClickOpenRemove} severity="success">
          inkomst/utgift raderad!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default FormDialog
