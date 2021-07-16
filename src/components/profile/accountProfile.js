import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Avatar,
    CardActions,
    Typography,
    InputLabel
} from '@material-ui/core';
import { useAuth } from '../../config/authProvider';
import { firebase } from "../../config/fbConfig";
import { Alert as MuiAlert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Banner from '../assets/banner'

const AccountProfileDetails = ({ usedUser }) => {
  const [values, setValues] = useState("");
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({...usedUser});
  console.log("******\nDATA\n******: AccountProfileDetails -> userInfo", userInfo)
  const { user, loading, logout } = useAuth();

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const closeAlert = () => {
        setOpen(false);
    };

    async function handleSubmit(event) {

        event.preventDefault();
        console.log(userInfo, 'this is the user info')
        console.log(user.uid, ' this is the uid')

        await firebase.firestore().collection('users').doc(user.uid).set({
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            phoneNumber: userInfo.phoneNumber,
            school: userInfo.school,
            municipality: userInfo.municipality,
            zipCode: userInfo.zipCode,
            adress: userInfo.adress,
        }, {merge: true}).then(res => {
            console.log('successss', res)
            setOpen(true);
        }).catch(error => {
            console.log(error, 'error message')
        });
    };


    const handleChange = (event) => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        });
    };

    return (
        <form
            autoComplete="off"
            noValidate
        >
            <Card>
            <Banner text={"Min Profil"} />

                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                        style={{ paddingTop : 10}}
                    >
                        <Avatar
                            src={AccountCircleIcon}
                            style={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                height: 100,
                                width: 100,
                            }}
                            sx={{
                                height: 100,
                                width: 100
                            }}
                        />
                        <Button
                            color="primary"
                            fullWidth
                            variant="text"
                        >
                            Ladda upp bild
                        </Button>
                        <Typography
                            color="textSecondary"
                            variant="body1"
                        >
                        </Typography>
                    </Box>
                </Grid>
                <CardHeader
                    subheader="Du kan ändra informationen här"
                    title="Profil"
                />
                <Divider />
                  <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="förnamn"
                                name="firstName"
                                onChange={handleChange}
                                required
                                value={userInfo.firstName}
                                disabled
                                variant="outlined"
                            >
                            </TextField>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Efternamn"
                                name="lastName"
                                onChange={handleChange}
                                required
                                value={userInfo.lastName}
                                disabled
                                variant="outlined"
                            >
                            </TextField>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Mailadress"
                                name="email"
                                onChange={handleChange}
                                required
                                disabled
                                value={userInfo.email}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Telefonnummer"
                                name="phone"
                                onChange={handleChange}
                                value={userInfo.phoneNumber}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="kommun"
                                name="municipality"
                                onChange={handleChange}
                                required
                                value={userInfo.municipality}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Adress"
                                name="adress"
                                onChange={handleChange}
                                required
                                value={userInfo.adress}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Skola"
                                name="school"
                                onChange={handleChange}
                                required
                                value={userInfo.school}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Postnummer"
                                name="zipCode"
                                onChange={handleChange}
                                required
                                value={userInfo.zipCode}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    xs={12}
                    style={{ padding: 20 }}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Spara
          </Button>
                </Grid>

                <Snackbar open={open} autoHideDuration={3000}>
                    <Alert onClick={closeAlert} severity="success">
                        Profil uppdaterad!{' '}
                    </Alert>
                </Snackbar>
            </Card>
        </form>
    );
};

export default AccountProfileDetails;
