"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

const createOnRampTransaction = async (amount: number, provider: string) => {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session?.user.id) {
    return {
      success:false,
      msg: "Unauthenticated Request",
    };
  }
  try {
    const randomToken = Math.random().toString();
  const tsx = await prisma.onRampTransaction.create({
    data: {
      amount,
      startTime: new Date(),
      provider,
      status: "Pending",
      userId: Number(session.user.id),
      token: randomToken,
    },
  });
  return {
    msg: tsx.status,
  };
  } catch (err) {
    return {
      success:false,
      msg:"Error while adding money"
    }
  }
  
};

export default createOnRampTransaction;
