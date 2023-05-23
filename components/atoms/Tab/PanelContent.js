import React, { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { TabPanel } from "../../organisms/Wallet/History";
import ItemHistory from "./ItemHistory";
import Fetcher from "../../../lib/Fetcher";
import { TransactionContext } from "../../organisms/Transaction";

const PanelContent = ({ value, index }) => {
  const { transaction, setTransaction } = useContext(TransactionContext);
  const { data: session } = useSession();
  const { data, isLoading, isError } = Fetcher(
    `/payment?type=${value == 0 ? "monthly" : value == 1 ? "weekly" : "day"}`,
    session.user.data.access_token
  );

  console.log(data);

  useEffect(() => {
    setTransaction({ state: true, transaction: data });
  }, [data]);

  console.log("data", data);

  return (
    <TabPanel value={value} index={index}>
      <section className="space-y-3">
        {isLoading || isError ? (
          <div className="w-full flex flex-col items-center gap-3">
            <span className="text-gray-400 text-xs font-normal">
              Chargement en cours...
            </span>
          </div>
        ) : data.length == 0 || data.code ? (
          <div className="w-full flex flex-col items-center gap-3">
            <span className="text-gray-400 text-xs font-normal">
              Aucune transaction...
            </span>
          </div>
        ) : (
          data &&
          data.map((item, i) => (
            <ItemHistory
              {...item}
              key={i}
              index={index}
              total={data.length ?? 0}
              accessToken={session.user.data.access_token}
            />
          ))
        )}
      </section>
    </TabPanel>
  );
};

export default PanelContent;
