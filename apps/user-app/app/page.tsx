

// import { useGetBalance } from "@repo/store/useGetBalance";
// export default function Home() {
//   // const balance = useGetBalance();
//   return (
//       <div className="text-3xl">
//         {/* {`Balance is ${balance}Rs`} */}hi
//       </div>
//   );
// }
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/dashboard')
  } else {
    redirect('/api/auth/signin')
  }
}