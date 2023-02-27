import { CiCircleList } from "react-icons/ci";
import CardHeader from "../../atoms/Card/Header";
import TransactionTable from "../../atoms/Table/Transaction";

const Transaction = () => {
	return (
		<div className="p-2 space-y-6 md:py-8 md:px-6 mb-20">
			<CardHeader
				title={"Transactions History"}
				sort={{
					icon: () => <span className="h-[15px] w-[15px] rounded bg-primary" />,
					items: ["Detail", "Cancel"]
				}}
				filter={{
					label: {
						title: "Sort By",
						className: "py-1 w-[auto]"
					},
					className: "w-[auto]",
					icon: () => <CiCircleList />,
					items: ["Detail", "Cancel"]
				}}
			/>
			<TransactionTable />
		</div>
	);
};

export default Transaction;
