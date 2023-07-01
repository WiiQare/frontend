import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

import SimpleHeader from "../../atoms/Card/Header/simple";
import TabPanelContent from "../../atoms/Tab/PanelContent";

const TabHistories = [
  {
    name: "Mensuel",
    transactions: [],
  },

  {
    name: "Hebdomadaire",
    transactions: [],
  },

  {
    name: "Aujourd'hui",
    transactions: [],
  },
];

const HistoryWallet = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="space-y-4 bg-white py-8 md:px-6 px-3 drop-shadow-sm rounded-lg">
      <Box sx={{ width: "100%" }}>
        <SimpleHeader
          title={"Historique des transactions"}
          describe={"Liste de toutes les transactions effectuées"}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              className="text-sm md:text-md"
            >
              {TabHistories.map((item, index) => (
                <Tab
                  label={item.name}
                  transactions={item.transactions}
                  {...a11yProps(index)}
                  key={index}
                />
              ))}
            </Tabs>
          </Box>
        </SimpleHeader>

        <div>
          {TabHistories.map((item, index) => (
            <TabPanelContent
              key={index}
              transactions={item.transactions}
              value={value}
              index={index}
            />
          ))}
        </div>
      </Box>
    </div>
  );
};

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
        <Box sx={{ p: 1 }}>
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default HistoryWallet;
