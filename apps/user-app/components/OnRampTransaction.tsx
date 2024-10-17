import { Card } from "@repo/ui/card";
import React from "react";

// const transactions: {
//   amount: number,
//   status:string
// }[] = [
//   {
//     amount: 500,
//     status: "Added",
//   },
//   {
//     amount: 1500,
//     status: "Added",
//   },
// ];
const OnRampTransaction = ({ 
  transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}
) => {
  return (
    <Card
      title={"Recent Transactions"}
      className="px-5 py-10 w-full border border-slate-300 "
    >
      <div className="overflow-y-auto max-h-32">
        {transactions.length > 0 ? (
          transactions?.map((txn, idx) => (
            <div
              key={idx}
              className={`flex justify-between border-y border-slate-300 p-1 ${txn.status==="Success"?"text-green-600":txn.status==="Pending"?"text-slate-800":"text-red-600"}`}
            >
              <div>
                
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                  {txn.time.toDateString()} ({txn.status})
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {txn.amount / 100}
                </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center p-1 text-slate-800">
            <p>No Recent Transactions</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OnRampTransaction;
