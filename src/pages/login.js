// Material UI components
import React, { Component, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebase } from "../config/fbConfig";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';



const styles = (theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
	},
	progess: {
		position: 'absolute'
	}
});

function Login(props) {

	const [state, setState] = useState({
		email: '',
		password: '',
		errors: [],
		loading: false
	})

	const [loggedIn, setLoggedIn] = useState(false);

	const handleChange = (event) => {

		const { name, value } = event.target;
		setState(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	async function handleSubmit(event) {
		event.preventDefault();

		setState({ loading: true });
		const userData = {
			email: state.email,
			password: state.password
		};

		firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
			.then((userCredential) => {
				// Signed in
				var user = userCredential.user;
				console.log(user, ' användare')
				setLoggedIn(true);
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode, errorMessage, 'error')
			});



	};
	if (loggedIn) return <Redirect to="/" />
	else
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div >
					<Avatar>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Logga in
					</Typography>
					<form noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Mailadress"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={handleChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Lösenord"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={handleChange}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							onClick={handleSubmit}
						>
							Logga in
					</Button>
						<Grid container>
							<Grid item>
								<Link href="signup" variant="body2">
									{"Har du inte ett konto? Skapa konto"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
}

export default withStyles(styles)(Login);
