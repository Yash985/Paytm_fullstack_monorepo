"use client";
import { Button } from "@repo/ui/button";
import { useState } from "react";

interface P2PTransferHistoryProp {
  sent:
    | {
        amount: number;
        timestamp: Date;
        toUser: {
          name: string | null;
        };
      }[]
    | undefined;
  recieved:
    | {
        amount: number;
        timestamp: Date;
        fromUser: {
          name: string | null;
        };
      }[]
    | undefined;
}
const P2PTransferHistory = ({ sent, recieved }: P2PTransferHistoryProp) => {
  const [toggle, setToggle] = useState("Sent");
  return (
    <div className="p-5 h-72 w-80 bg-white rounded-xl flex flex-col">
      <div className="border-b border-slate-800 pb-2">
      <div className="flex gap-2">
        <Button
          onClick={() => setToggle("Sent")}
          className={`px-4 py-2 ${toggle === "Sent" ? "bg-slate-800" : "bg-slate-500"} text-white rounded-xl`}
        >
          Sent
        </Button>
        <Button
          onClick={() => setToggle("Recieved")}
          className={`px-4 py-2 ${toggle === "Recieved" ? "bg-slate-800" : "bg-slate-500"} text-white rounded-xl`}
        >
          Recieved
        </Button>
        </div>
        </div>
      {toggle === "Sent" ? (
        <div className="overflow-y-auto  p-2">
          {sent?.map((s) => (
            <div className="border-b pb-1 my-1 w-full text-sm ">
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-1">
                    <p className="font-medium">To:</p>
                    <p className="font-semibold">{s.toUser?.name?.toUpperCase()}</p>
                  </div>
                  <p className="text-[12px] text-slate-500">{s.timestamp.toDateString()}</p>
                </div>
                <p>-{s.amount} INR</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
          <div className="overflow-y-auto  p-2">
            {recieved?.map((r) => (
            <div className="border-b pb-1 my-1 w-full text-sm overflow-y-auto">
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-1">
                    <p className="font-medium">From:</p>
                    <p className="font-semibold">{r.fromUser?.name?.toUpperCase()}</p>
                  </div>
                  <p className="text-[12px] text-slate-500">{r.timestamp.toDateString()}</p>
                </div>
                <p>+{r.amount} INR</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default P2PTransferHistory;
