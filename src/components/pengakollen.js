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
    Container
} from '@material-ui/core';
import Expenses from './pengakollen/expenses'

const states = [
    {
        value: 'alabama',
        label: 'Alabama'
    },
    {
        value: 'new-york',
        label: 'New York'
    },
    {
        value: 'san-francisco',
        label: 'San Francisco'
    }
];

const Pengakollen = ({usedUser}) => {
    const [values, setValues] = useState({
        firstName: 'Katarina',
        lastName: 'Smith',
        email: 'demo@devias.io',
        phone: '',
        state: 'Alabama',
        country: 'USA'
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return (
        <>
            <Card>
                <CardHeader
                    subheader="Att hålla koll på ekonomin är viktigt. Pengar in (intäkter) och pengar ut (utgifter) berättar om ditt företags resultat - det vill säga hur mycket vinst eller förlust ditt företag går. 
        
          Glöm inte bort att bokföra varje köp eller försäljning. Avvara lite tid när din arbetsdag är över så har du stenkoll på din ekonomi under sommaren.
          "
                    title="Håll koll på ekonomin!"
                />
                <Divider />
            </Card>

            <Box
            style={{marginTop : 10}}
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={6}
                            md={6}
                            xl={6}
                            xs={12}
                        >
                            <Expenses usedUser={usedUser} expense={true}/>
                        </Grid>
                        <Grid
                            item
                            lg={6}
                            md={6}
                            xl={6}
                            xs={12}
                        >
                            <Expenses sedUser={usedUser} expense={false} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Pengakollen;