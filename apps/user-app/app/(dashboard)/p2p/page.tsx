import { getServerSession } from "next-auth";
import P2PTransferHistory from "../../../components/P2PTransferHistory";
import SendCard from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

const getP2PTransactions = async() => {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return {
            success: false,
            mgs:"User not logged in"
        }
    }
    const userId=session?.user.id
    const sent = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId:Number(userId)
        },
        select: {
            amount: true,
            timestamp: true,
            toUser: {
                select: {
                    name:true
                }
            }
        }
    })
    const recieved = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: Number(userId)
        },
        select: {
            amount: true,
            timestamp: true,
            fromUser: {
                select: {
                    name:true
                }
            }
        }
    })
    return {sent,recieved}
}

const page = async () => {
    const { sent, recieved } = await getP2PTransactions();
    return (
        <div className="flex justify-center items-center w-full px-10 gap-10">
        <SendCard />
        <P2PTransferHistory sent={sent} recieved={recieved} />
        </div>
    )
};

export default page;
