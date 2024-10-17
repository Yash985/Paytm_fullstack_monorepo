import { Card } from '@repo/ui/card'
import React from 'react'

const Balance = ({ amount,locked}:{amount:number,locked:number}) => {
  return (
      <Card title='Balance' className='w-full py-10 px-6 border border-slate-300'> 
          <div>
              <div className='flex justify-between border-y border-slate-300 p-1'>
                  <p className='font-semibold'>Unlocked Balance</p>
                  <p className='font-semibold'>{amount/100} INR</p>
            </div>
            <div className='flex justify-between border-y border-slate-300 p-1'>
                  <p className='font-semibold'>Locked Balance</p>
                  <p className='font-semibold'>{locked/100} INR</p>
            </div>
            <div className='flex justify-between border-y border-slate-300 p-1'>
                  <p className='font-semibold'>ToTal Balance</p>
                  <p className='font-semibold'>{(amount+locked)/100} INR</p>
            </div>
          </div>
    </Card>
  )
}

export default Balance