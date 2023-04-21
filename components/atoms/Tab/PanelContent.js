import React, { useContext, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { TabPanel } from '../../organisms/Wallet/History';
import ItemHistory from './ItemHistory';
import Fetcher from '../../../lib/Fetcher';
import { TransactionContext } from '../../organisms/Transaction';


const PanelContent = ({ transactions, value, index }) => {

    const {transaction, setTransaction} = useContext(TransactionContext);
	const { data:session } = useSession();
    const {data, isLoading, isError} = Fetcher(`/payment?type=${value == 0 ? "monthly" : value == 1 ? "weekly" : "day"}`, session.user.data.access_token);

    useEffect(() => {
        setTransaction({state: true, transaction: data})
    }, [data]);

    return (
        <TabPanel value={value} index={index} >

            <section className="space-y-3">

                {isLoading || isError ? <>Chargement en cours...</> : data.map((item, i) => <ItemHistory {...item} key={i} value={value} index={index} total={data.length ?? 0} />)}
            
            </section>

        </TabPanel>
    );
}

export default PanelContent;