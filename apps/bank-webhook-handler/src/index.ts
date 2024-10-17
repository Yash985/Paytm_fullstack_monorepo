import express from "express";
import prisma from "@repo/db/client"
const app = express();

app.use(express.json());
app.post("/hdfcwebhook",async (req, res) => {
    //TODO: Add zod validation here?
    //check if the request actually came from hdfc using secret
    //TODO:Check if this transaction is processing or not
    //If it is processing then only you should update the value
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    //You want either balance and onRamp both update or none of them updates
    //Therefore use transactions here   
    // Update balance in db, add txn
    try {
        await prisma.$transaction([
             prisma.balance.update({
                where: {
                    userId:Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where: {
                    token:paymentInformation.token,
                },
                data: {
                    status:"Success"
                }
            })

        ])
        res.status(200).json({
            msg:"Captured"
        })
    } catch (err) {
        console.log("Error is",err)
        res.status(411).json({
            msg:"Error while processing webhook"
        })
    }
})

app.listen(3003, () => {
    console.log("Server is listening on port 3003.")
})