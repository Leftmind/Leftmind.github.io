import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import login from './pages/login';
import signup from './pages/signup';
import homePage from './pages/homePage';
// import { AuthProvider } from "./context/AuthContext";
import { AuthProvider } from "./config/authProvider";

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#33c9dc',
			main: '#FF5722',
			dark: '#d50000',
			contrastText: '#fff'
		}
  }
});

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Router>
				<div>
          <AuthProvider>
					<Switch>
						<Route exact path="/" component={homePage} />
						<Route exact path="/login" component={login} />
						<Route exact path="/signup" component={signup} />
					</Switch>
          </AuthProvider>
				</div>
			</Router>
		</MuiThemeProvider>
	);
}

export default App;
