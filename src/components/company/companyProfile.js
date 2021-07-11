import { useState, useEffect } from 'react';
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

const AccountProfileDetails = ({ usedUser }) => {
    const [values, setValues] = useState("");
    const [open, setOpen] = useState(false);
    const [company, setCompany] = useState({
        facebook: '-',
        instagram: '-',
        website: '-'
    });
    const [userInfo, setUserInfo] = useState("");
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

        await firebase.firestore().collection('companies').doc(company.companyId).set({
            facebook: company.facebook,
            instagram: company.instagram,
            website: company.website,
        }, { merge: true }).then(res => {
            console.log('successss', res)
            setOpen(true);
        }).catch(error => {
            console.log(error, 'error message')
        });
    };


    useEffect(async () => {
        setUserInfo(usedUser)
        console.log(userInfo, 'från account profile page')

        const userDocRef = firebase.firestore().collection('companies').doc(usedUser.companies[0].companyId);
        const dataExists = await userDocRef.get();
        setCompany(dataExists.data());

        console.log(company);
        console.log(dataExists.data(), 'user data');

    }, []);


    const handleChange = (event) => {
        setCompany({
            ...company,
            [event.target.name]: event.target.value
        });
    };

    return (
        <form
            autoComplete="off"
            noValidate
        >

            <Card>
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
                            Ladda upp företagsbild
                        </Button>
                        <Typography
                            color="textSecondary"
                            variant="body1"
                        >
                        </Typography>
                    </Box>
                </Grid>
                <CardHeader
                    subheader={company.bio}
                    title={company.companyName}
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
                                label="Instagram"
                                name="instagram"
                                onChange={handleChange}
                                required
                                value={company.instagram}
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
                                label="företagets facebook"
                                name="facebook"
                                onChange={handleChange}
                                required
                                value={company.facebook}
                                variant="outlined"
                            >
                            </TextField>
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Företagets hemsida"
                                name="website"
                                onChange={handleChange}
                                required
                                value={company.website}
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
                        Företagsinformation uppdaterad!{' '}
                    </Alert>
                </Snackbar>
            </Card>
        </form>
    );
};

export default AccountProfileDetails;
