import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';
import { useState, useEffect } from 'react';
import { firebase } from "../../config/fbConfig";
import { useAuth } from '../../config/authProvider';

const ExpenseAmountMoney = ({usedUser}) => {
  const theme = useTheme();

  const [userInfo, setUserInfo] = useState("");
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState({
    facebook: '-',
    instagram: '-',
  });
  const [companyExpense, setCompanyExpense] = useState({
    expenses: 0,
    profits: 0,
  });

  const data = {
    datasets: [
      {
        data: [ companyExpense.profits, companyExpense.expenses],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Inkomster', 'Utgifter']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    height: 500,
    width: 500,
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };


  useEffect(async () => {
    setUserInfo(usedUser)

    const userDocRef = firebase.firestore().collection('companies').doc(usedUser.companies[0].companyId);
    const dataExists = await userDocRef.get();

    const companyData = dataExists.data();
    companyData.expenses.sort(function (x, y) {
      return y.timestamp - x.timestamp;
    })
    companyData.profits.sort(function (x, y) {
      return y.timestamp - x.timestamp;
    })

    let expenses = 0;
    let profits = 0;


    if(companyData.expenses.length > 1){
      expenses = companyData.expenses.map(item => item.transactionAmount).reduce((prev, next) => +prev + +next);
    }
    if(companyData.profits.length > 1){
      profits = companyData.profits.map(item => item.transactionAmount).reduce((prev, next) => +prev + +next);
    } 

    console.log(profits, expenses)
    setCompanyExpense({expenses : expenses, profits: profits})



    setCompany(companyData);

  }, []);

  if (!company.website) return null
  return (
    <Card style={{marginTop : 10}}>
      <CardHeader title="Alla inkomster och utgifter" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >

            <Box
              key="Utgifter"
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                Inkomster
              </Typography>
              <Typography
                style={{color : colors.indigo[500]}}
                variant="h4"
              >
                {companyExpense.profits}
                Kr
              </Typography>
            </Box>
            <Box
              key="Inkomster"
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                Utgifter
              </Typography>
              <Typography
                style={{ color : colors.red[600] }}
                variant="h4"
              >
                {companyExpense.expenses}
                Kr
              </Typography>
            </Box>
            <Box
              key="Totalt"
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                Totalt
              </Typography>
              <Typography
                style={{ color : colors.lightGreen[600] }}
                variant="h4"
              >
                {+companyExpense.profits - +companyExpense.expenses}
                Kr
              </Typography>
            </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpenseAmountMoney;