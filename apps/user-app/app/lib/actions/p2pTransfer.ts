"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export const p2pTransfer = async (number: string, amount: string) => {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    return {
      success: false,
      msg: "Error while sending...!",
    };
  }
  const to = await prisma.user.findFirst({
    where: {
      number,
    },
  });
  if (!to) {
    return {
      success: false,
      msg: "User not found",
    };
  }
  try {
    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
      const fromBalance = await tx.balance.findUnique({
        where: {
          userId: Number(from),
        },
      });
      if (!fromBalance || fromBalance.amount < Number(amount)) {
        return {
          success: false,
          msg: "Insuffcient Balance",
        };
      }
      await tx.balance.update({
        where: {
          userId: Number(from),
        },
        data: {
          amount: { decrement: Number(amount) * 100 },
        },
      });
      await tx.balance.update({
        where: {
          userId: to.id,
        },
        data: {
          amount: { increment: Number(amount) * 100 },
        },
      });
      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(from),
          toUserId: to.id,
          amount: Number(amount),
          timestamp: new Date(),
        },
      });
    });
  } catch (err) {
    return {
      success: false,
      msg: "Error While sending money",
    };
  }
  return {
    success: true,
    msg: "Transfered Successfull",
  };
};
