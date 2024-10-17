"use client"
import { Button } from "@repo/ui/button";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import toast from "react-hot-toast";

const SendCard = () => {
    const [amount, setAmount] = useState("");
    const [number, setNumber] = useState("");
    const handleClick = async () => {
        setAmount("")
        setNumber("")
        const res = await p2pTransfer(number, amount)
        if (!res.success) {
            toast.error(res.msg)
        }
        toast.success(res.msg)
    }
    return (
      <div className="">
        <div className="p-5 h-72 w-80 bg-white rounded-xl flex flex-col items-center">
          <p className="font-bold my-4 text-xl">Send Money</p>
          <div className="flex flex-col justify-start w-full">
            <label htmlFor="number" className="my-1">
              Number
            </label>
            <input
              id="number"
              type="text"
              className="bg-slate-100 w-full border border-slate-300 rounded-lg py-1 px-2"
              placeholder="Number"
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              value={number}
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            <label htmlFor="amount" className="my-1">
              Amount
            </label>
            <input
              id="amount"
              type="text"
              className="bg-slate-100 w-full border border-slate-300 rounded-lg py-1 px-2"
              placeholder="Amount"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              value={amount}
            />
          </div>
          <Button
            onClick={handleClick}
            className="px-7 py-2 text-white font-medium bg-neutral-600 rounded-xl mt-3"
          >
            Send
          </Button>
        </div>
      </div>
    );
}

export default SendCard