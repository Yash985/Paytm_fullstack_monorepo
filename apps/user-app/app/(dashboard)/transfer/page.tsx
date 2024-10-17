import { getServerSession } from "next-auth";
import AddMoney from "../../../components/AddMoney"
import Balance from "../../../components/Balance"
import OnRampTransaction from "../../../components/OnRampTransaction"
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

async function getBalance() {
  const session = await getServerSession(authOptions);
  if (session) {
    const balance = await prisma.balance.findFirst({
      where: {
          userId: Number(session?.user?.id)
      }
  });
  return {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0
  }
  } else {
    // alert("You are not logged in");
    redirect("/api/auth/signin");
  }
  
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  if(session){
    const txns = await prisma.onRampTransaction.findMany({
      where: {
          userId: Number(session?.user?.id)
      }
  });
  return txns.map(t => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider
  }))
  }else {
    // alert("You are not logged in");
    redirect("/api/auth/signin");
  }
  
}

const page = async() => {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
   return (
    <div className="w-screen">
    <div className="text-4xl text-[#6a51a6] pt-8 mb-8 ml-16 font-bold">
        Transfer
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
            <AddMoney />
        </div>
        <div>
            <Balance amount={balance.amount} locked={balance.locked} />
            <div className="pt-4">
                <OnRampTransaction transactions={transactions} />
            </div>
        </div>
    </div>
</div>
  )
}
export default page

//  const page = () => {
//    return (
//     <div>
//     <div className="grid grid-cols-3 w-full p-10 h-full">
//       <div className="col-span-2">
//       <AddMoney />
//       </div>
//       <div className=" col-span-1 flex flex-col">
//         <Balance />
//         <OnRampTransaction transactions={}/>
//       </div>
//        </div>
//      </div>
//   )
// }
