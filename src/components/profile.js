import {
    Box,
    Container,
    Grid,
    Card
} from '@material-ui/core';
import AccountProfileDetails from './profile/accountProfile';
import planetBackground from '../images/bakgrund.jpg'
import Banner from './ContainerBanner'
import portalenHand from '../images/portalenHand.png'
import s, { css } from 'styled-components';

// import AccountProfileDetails from 'src/components/account/AccountProfileDetails';

const BannerTitle = s.h1({
    fontFamily: 'Alfa Slab One, cursive',
    color: 'white',
    textShadow: '0px 2px 5px #696969',
    margin: 0,
  });

const Profile = ({ usedUser }) => (
    <div>
        <Box
            sx={{
                backgroundColor: 'background.default',
                minHeight: '100%',
                py: 3,
            }}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={7}
                >
                    <Grid
                        item
                        lg={8}
                        md={12}
                        xs={12}
                    >
                    </Grid>
                </Grid>

            </Container>

            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        lg={8}
                        md={12}
                        xs={12}
                    >
                        <AccountProfileDetails usedUser={usedUser} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </div>
);

export default Profile;
