import CardTransaction from "../../atoms/Card/Transaction";
import TransactionTable from "../../atoms/Table/Transaction";

const Transaction = () => {
  return (
    <div className="p-2 space-y-6 md:py-8 md:px-6">
      <CardTransaction />
      <TransactionTable />
    </div>
  );
};

export default Transaction;
