import React from 'react';
import { useSession } from "next-auth/react";
import { TabPanel } from '../../organisms/Wallet/History';
import ItemHistory from './ItemHistory';
import Fetcher from '../../../lib/Fetcher';


const PanelContent = ({ transactions, value, index }) => {

	const { data:session } = useSession();
    const {data, isLoading, isError} = Fetcher(`/payment?type=${value == 0 ? "monthly" : value == 1 ? "weekly" : "day"}`, session.user.data.access_token);

    return (
        <TabPanel value={value} index={index} >

            <section className="space-y-3">

                {isLoading || isError ? <>Loading...</> : data.map((item, i) => <ItemHistory {...item} key={i} value={value} index={index} total={data.length ?? 0} />)}
            
            </section>

        </TabPanel>
    );
}

export default PanelContent;