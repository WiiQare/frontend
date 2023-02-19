import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import SimpleHeader from '../../atoms/Card/Header/simple';
import TabPanelContent from '../../atoms/Tab/PanelContent';

const TabHistories = [
    {
        name: "Monthly",
        transactions: [
            {
                fullname: "Bienvenu Z.",
                email: "bzigabe@hotmail.com",
                createdAt: {
                    date: "June 1, 2023",
                    hour: "08:22 AM"
                },
                amount: "5,321",
                paymentMethod: "Mastercard",
                state: 1
            },
            {
                fullname: "Alain MK",
                email: "frdrcpeter@hotmail.com",
                createdAt: {
                    date: "June 1, 2023",
                    hour: "08:22 AM"
                },
                amount: "1,429",
                paymentMethod: "Mastercard",
                state: 0
            }
        ]
    },

    {
        name: "Weekly",
        transactions: [
            {
                fullname: "Bienvenu Z.",
                email: "frdrcpeter@hotmail.com",
                createdAt: {
                    date: "June 1, 2023",
                    hour: "08:22 AM"
                },
                amount: "5,321",
                paymentMethod: "Mastercard",
                state: 1
            },
            {
                fullname: "Alain MK",
                email: "frdrcpeter@hotmail.com",
                createdAt: {
                    date: "June 1, 2023",
                    hour: "08:22 AM"
                },
                amount: "1,429",
                paymentMethod: "Mastercard",
                state: 1
            },
            {
                fullname: "Alain MK",
                email: "frdrcpeter@hotmail.com",
                createdAt: {
                    date: "June 1, 2023",
                    hour: "08:22 AM"
                },
                amount: "1,429",
                paymentMethod: "Mastercard",
                state: 0
            },
            {
                fullname: "Alain MK",
                email: "frdrcpeter@gmail.com",
                createdAt: {
                    date: "June 1, 2023",
                    hour: "08:22 AM"
                },
                amount: "1,429",
                paymentMethod: "Mastercard",
                state: 2
            }
        ]
    },

    {
        name: "Today",
        transactions: [
            {
                fullname: "Peter NDENGO",
                email: "frdrcpeter@hotmail.com",
                createdAt: {
                    date: "June 1, 2023",
                    hour: "08:22 AM"
                },
                amount: "5,321",
                paymentMethod: "Mastercard",
                state: 1
            }
        ]
    }
]

const HistoryWallet = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="space-y-4 bg-white py-8 px-6 drop-shadow-sm rounded-lg">

            <Box sx={{ width: '100%' }}>

                <SimpleHeader title={"Payment History"} describe={"Lorem ipsum dolor sit amet, consectetur"}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            {TabHistories.map((item, index) => <Tab label={item.name} transactions={item.transactions} {...a11yProps(index)} key={index} />)}
                        </Tabs>
                    </Box>
                </SimpleHeader>

                <div>
                    {TabHistories.map((item, index) => <TabPanelContent transactions={item.transactions} value={value} index={index} />)}
                </div>
            </Box>
        </div>
    );
}

export function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default HistoryWallet;
