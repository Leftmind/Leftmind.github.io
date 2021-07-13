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
    Container
} from '@material-ui/core';
import Expenses from './pengakollen/expenses'
import ExpenseAmountMoney from './pengakollen/expenseAmountMoney'
import { firebase } from "../config/fbConfig";


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

    const hasCompany = 'companies' in usedUser;
    const [userInfo, setUserInfo] = useState("");
    const [company, setCompany] = useState({
        facebook: '-',
        instagram: '-',
        website: '-'
    });


    const [values, setValues] = useState({
        firstName: 'Katarina',
        lastName: 'Smith',
        email: 'demo@devias.io',
        phone: '',
        state: 'Alabama',
        country: 'USA'
    });

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
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    const inkomst = {expense : false};
    const utgift = {expense : true};

    if(!hasCompany) return <div> Start or join a company first</div>
    else
    return (
        <>
            <Card>
                <CardHeader
                    subheader="Att hålla koll på ekonomin är viktigt. Pengar in (intäkter) och pengar ut (utgifter) berättar om ditt företags resultat - det vill säga hur mycket vinst eller förlust ditt företag går. 
        ,,
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
                            <Expenses usedUser={usedUser} expense={false} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <ExpenseAmountMoney usedUser={usedUser} sx={{ height: '100%' }} />
          </Grid>
        </>
    );
};

export default Pengakollen;