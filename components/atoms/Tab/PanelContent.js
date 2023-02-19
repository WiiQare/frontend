import React from 'react';
import { TabPanel } from '../../organisms/Wallet/History';
import ItemHistory from './ItemHistory';

const PanelContent = ({ transactions, value, index }) => {
    return (
        <TabPanel value={value} index={index} >

            <section className="space-y-3">

                {transactions.map((item, index) => <ItemHistory {...item} key={index} index={index} total={transactions.length ?? 0} />)}
            
            </section>

        </TabPanel>
    );
}

export default PanelContent;