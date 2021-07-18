import React from 'react'
import {
  Box,
  Button,
  CardMedia,
  Avatar,
  Typography,
  CircularProgress,
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const UploadImage = (props) => {
  const { loading, uploadedImage, onFileChange } = props
  return (
    <Box
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 10,
      }}
    >
      {uploadedImage && !loading ? (
        <CardMedia
          component="img"
          alt="company image"
          image={uploadedImage}
          title="Company Image"
          style={{
            borderRadius: 200,
            height: 200,
            width: 200,
          }}
        />
      ) : (
        <>
          {loading ? (
            <Box
              style={{
                height: 200,
                width: 200,
                borderRadius: 200,
                backgroundColor: '#bdbdbd',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CircularProgress color="secondary" />
            </Box>
          ) : (
            <Avatar
              src={AccountCircleIcon}
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                height: 200,
                width: 200,
              }}
            />
          )}
        </>
      )}
      <Button
        color="primary"
        variant="contained"
        component="label"
        style={{ marginTop: 20 }}
      >
        Ladda upp företagsbild
        <input type="file" hidden onChange={onFileChange} />
      </Button>
      <Typography color="textSecondary" variant="body1"></Typography>
    </Box>
  )
}

export default UploadImage
