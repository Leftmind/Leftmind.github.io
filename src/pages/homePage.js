import React, { useState, useEffect } from 'react'
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import BusinessIcon from '@material-ui/icons/Business'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import AssignmentIcon from '@material-ui/icons/Assignment'
import AssessmentIcon from '@material-ui/icons/Assessment'
import { Redirect } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import planetBackground from '../images/bakgrund.jpg'
import Company from '../components/company'
import Profile from '../components/profile'
import Utmaning from '../components/utmaning'
import PengaKollen from '../components/pengakollen'
import { firebase } from '../config/fbConfig'
import { useAuth } from '../config/authProvider'
import FramtidsPortalenLogo from '../assets/Logga-framtidsportalen.png'
import FramtidsPortalenBanner from '../assets/framtidsportalen-logga_alt.png'
import AllCompanies from '../components/allCompanies'

const drawerWidth = 240

const icons = [
  <AccountBoxIcon />,
  <BusinessIcon />,
  <MonetizationOnIcon />,
  <AssignmentIcon />,
  <AssessmentIcon />,
  <ExitToAppIcon />,
]
const appPages = [
  'Min Profil',
  'Mitt Företag',
  'Pengakollen',
  'Utmaning',
  'Business bootcamp',
  'Alla Företag',
]

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
    marginTop: 20,
  },
}))

function ResponsiveDrawer(props) {
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [page, setPage] = useState('Min Profil')
  const { user, loading, logout } = useAuth()
  const [usedUser, setUserUser] = useState({})

  useEffect(() => {
    if (user) {
      const userDocRef = firebase.firestore().collection('users').doc(user.uid)
      userDocRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUserUser(doc.data())
          } else {
            console.log('No such document!')
          }
        })
        .catch((error) => {
          console.log('******\nDATA\n******: ResponsiveDrawer -> error', error)
        })
    }
  }, [user])

  if (loading) return null
  if (!user) return <Redirect to="/login" />

  const changeViewFunction = (whatPage) => setPage(whatPage)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

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
        {appPages.map((text, index) => {
          const selectedPage = page === text
          return (
            <ListItem
              style={{ backgroundColor: selectedPage ? '#96CB3C' : 'inherit' }}
              button
              key={text}
              onClick={() => changeViewFunction(text)}
            >
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    type="body1"
                    style={{ fontWeight: selectedPage ? '600' : '400' }}
                  >
                    {text}
                  </Typography>
                }
              />
            </ListItem>
          )
        })}
        <ListItem button onClick={logout}>
          <ListItemIcon>{icons[5]}</ListItemIcon>
          <ListItemText primary="logga ut" />
        </ListItem>
      </List>
      <Divider />
    </div>
  )

  const pageToRender = () => {
    switch (page) {
      case 'Min Profil':
        return <Profile usedUser={usedUser} />
      case 'Mitt Företag':
        return <Company usedUser={usedUser} />
      case 'Pengakollen':
        return <PengaKollen usedUser={usedUser} />
      case 'Utmaning':
        return <Utmaning usedUser={usedUser} />
      case 'Alla Företag':
        return <AllCompanies usedUser={usedUser} />
      default:
        return null
    }
  }

  const container =
    window !== undefined ? () => window().document.body : undefined
  return (
    <div
      className={classes.root}
      style={{
        backgroundImage: `url(${planetBackground})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat-y',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100%',
        height: '100%',
      }}
    >
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
          <img
            src={FramtidsPortalenBanner}
            alt="framtidens portal banner"
            style={{ height: 50 }}
          />
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
        <div>{Object.keys(usedUser).length > 0 ? pageToRender() : null}</div>
      </main>
    </div>
  )
}

export default ResponsiveDrawer
