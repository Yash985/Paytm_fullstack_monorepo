"use client"
import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import React, { useState } from 'react'
import createOnRampTransaction from '../app/lib/actions/createOnRampTransaction';
import toast from 'react-hot-toast';

const SUPPORTED_BANKS = [{
  name: "HDFC Bank",
  redirectUrl: "https://netbanking.hdfcbank.com"
}, {
  name: "Axis Bank",
  redirectUrl: "https://www.axisbank.com/"
}];


const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [amount, setAmount] = useState(0);
  const [provider,setProvider]=useState(SUPPORTED_BANKS[0]?.name || "")
  const handleClick = async () => {
    if (amount <= 0) {
      //toast.error
      return {
        msg:"Amount cannot be 0"
      }
    }
    window.location.href = redirectUrl || "";
    const res = await createOnRampTransaction(amount * 100, provider);
    if (!res.success) {
      toast.error(res.msg)
    }
    toast.success(res.msg)
  }
  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const bank = e.target.value
    setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === bank)?.redirectUrl)
    setProvider(SUPPORTED_BANKS.find(x => x.name === bank)?.name || "");
  }
  return (
    <Card title={"Add Money"} className='w-full px-28 py-10 border border-slate-300' >
      <div className='flex flex-col gap-5 font-semibold rounded-md '>
      <div className='flex flex-col'>
        <label htmlFor='amount'>Amount</label>
        <input onChange={(e)=>setAmount(Number(e.target.value))} value={amount} id='amount' type='text' placeholder='Amount' className='w-full p-1 mt-1' />
      </div>
      <div className='flex flex-col'>
        <label>Bank</label>
        <select className='w-full p-1 rounded-md mt-1' onChange={(e)=>handleChange(e)}>
            {
              SUPPORTED_BANKS.map((x,idx) => (
                <option key={idx} value={x.name}>{x.name}</option>
              ))
            }
        </select>
      </div>
      <div className='flex flex-col items-center mt-2'>
        <Button onClick={handleClick} className='px-4 py-2 bg-black text-white rounded-lg'>Add Money</Button>
      </div>
        </div>
    </Card>
  )
}

export default AddMoney