"use client"

import { Appbar } from "@repo/ui/appbar"
import { signIn, signOut, useSession } from "next-auth/react"

export const AppClient = () => {
  const session = useSession();
    return (
      <div>
        <Appbar onSignin={() => signIn()} onSignout={() => signOut({ callbackUrl: "/api/auth/signin" })} user={session.data?.user} />
      </div>
  )
}
