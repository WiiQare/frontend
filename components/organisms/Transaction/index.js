import React, { createContext, useState } from "react";
import CardHeader from "../../atoms/Card/Header";
import HistoryWallet from "../Wallet/History";
import { CiCircleList } from "react-icons/ci";

import Quickly from "./quickly";
export const TransactionContext = createContext();


const Transaction = () => {

	const [transaction, setTransaction] = useState({state: false, transactions: []});

	return (
		<div className="p-2 space-y-6 md:py-8 md:px-6 mb-20">
			<CardHeader
				title={"Historique des transactions"}
				sort={{
					icon: () => <span className="h-[15px] w-[15px] rounded bg-primary" />,
					items: ["Détail", "Annuler"]
				}}
				filter={{
					label: {
						title: "Trier par",
						className: "py-1 w-[auto]"
					},
					className: "w-[auto]",
					icon: () => <CiCircleList />,
					items: ["Detail", "Annuler"]
				}}
			/>

			<TransactionContext.Provider value={{ transaction, setTransaction }}>
				<HistoryWallet />
				<Quickly />
			</TransactionContext.Provider>

		</div>
	);
};

export default Transaction;
