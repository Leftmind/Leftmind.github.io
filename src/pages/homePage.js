import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/avatar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BusinessIcon from '@material-ui/icons/Business';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssessmentIcon from '@material-ui/icons/Assessment';
import planetBackground from '../images/bakgrund.jpg'
import Banner from '../components/ContainerBanner'
import portalenHand from '../images/portalenHand.png'
import Company from '../components/company';
import Profile from '../components/profile';
import Utmaning from '../components/utmaning';
import PengaKollen from '../components/pengakollen'
import { firebase } from "../config/fbConfig";
import { useState, useEffect } from 'react';
import { useAuth } from '../config/authProvider';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FramtidsPortalenLogo from '../assets/Logga-framtidsportalen.png'
import FramtidsPortalenBanner from '../assets/framtidsportalen-logga_alt.png'
import AllCompanies from '../components/allCompanies'


import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;


const icons = [<AccountBoxIcon />, <BusinessIcon />, <MonetizationOnIcon />, <AssignmentIcon />, <AssessmentIcon />, <ExitToAppIcon />];
const allPages = ['profile', 'company', 'pengakollen', 'myGoals', 'bootcamp']

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        backgroundColor: '#96CB3C',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    avatar: {
        height: 110,
        width: 110,
        flexShrink: 0,
        flexGrow: 0,
        marginTop: 20
    },
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [page, setPage] = useState('Min Profil');
    const { user, loading, logout } = useAuth();
    const [usedUser, setUserUser] = useState({});

    useEffect(() => {
        if(user){
        const userDocRef = firebase.firestore().collection('users').doc(user.uid);
        userDocRef.get().then((doc) => {
          if (doc.exists) {
              setUserUser(doc.data());
          } else {
              console.log("No such document!");
          }
        }).catch ((error) => {
        console.log("******\nDATA\n******: ResponsiveDrawer -> error", error)
        })
        }
    }, [user]);

    if (loading) return null;
    if (!user) return <Redirect to="/login" />

    const changeViewFunction = (whatPage) => setPage(whatPage);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <center>
                    <Avatar src={FramtidsPortalenLogo} className={classes.avatar} />
                    <p>
                        {' '}
                        {usedUser.firstName} {usedUser.lastName}
                    </p>
                </center>
            </List>
            <Divider />
            <List>
                {['Min Profil', 'Mitt Företag', 'Pengakollen', 'Utmaning', 'Business bootcamp', 'Alla Företag'].map((text, index) => (
                    <ListItem button key={text} onClick={() => changeViewFunction(text)}>
                        <ListItemIcon>{icons[index]}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                <ListItem button onClick={logout} >
                    <ListItemIcon>{icons[5]}</ListItemIcon>
                    <ListItemText primary="logga ut" />
                </ListItem>
            </List>
            <Divider />
        </div>
    );

    const pageToRender = () => {
      switch(page) {
        case 'Min Profil':
          return <Profile usedUser={usedUser}/>
        case 'Mitt Företag':
          return <Company usedUser={usedUser}/>
        case 'Pengakollen':
          return <PengaKollen usedUser={usedUser}/>
        case 'Utmaning':
          return <Utmaning usedUser={usedUser}/>
        case 'Alla Företag':
            return <AllCompanies usedUser={usedUser}/>
        default:
          return null;
      }
    }

    const container = window !== undefined ? () => window().document.body : undefined;
        return (
            <div className={classes.root}
              style={{
                backgroundImage: `url(${planetBackground})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'repeat-y',
                backgroundAttachment: "fixed",
                minHeight: '100vh',
                width: '100%',
                height: '100%'
                }}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <img src={FramtidsPortalenBanner} style={{ height: 50}}/>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div>
                      {
                        Object.keys(usedUser).length > 0 ? (
                          pageToRender()
                        ) : (
                          null
                        )
                      }
                    </div>
                </main>
            </div>
        );
}

export default ResponsiveDrawer;