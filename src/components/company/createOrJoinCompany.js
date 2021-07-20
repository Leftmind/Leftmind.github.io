import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'

function JoinCompany({ join, onChange }) {
  const [joinOrNot, setJoinOrNot] = useState('')

  function joinOrCreate() {
    if (join) {
      setJoinOrNot({ create: true })
    } else {
      setJoinOrNot({ create: false, companyName: state.companyName })
    }

    onChange(joinOrNot)
  }

  const [state, setState] = useState({
    companyName: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <CardContent style={{ justifyContent: 'center' }}>
        <Grid container spacing={3}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={joinOrCreate}
            >
              {join ? 'Starta ett nytt företag' : 'Joina existerande företag'}
            </Button>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography color="textSecondary" variant="caption">
            {join ? (
              'Klicka här om du vill starta ditt eget företag, du kan sedan' +
              ' välja att bjuda in dina vänner.'
            ) : (
              <TextField
                variant="outlined"
                required
                fullWidth
                id="companyName"
                label="företagets namn du vill joina"
                name="companyName"
                onChange={handleChange}
                style={{ marginTop: 10 }}
              />
            )}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default JoinCompany
