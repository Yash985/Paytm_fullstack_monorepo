"use client"
import { Button } from "@repo/ui/button"
import { useRouter } from "next/navigation"

const notFound = () => {
    const router = useRouter();
    return (
        <div className="h-[80vh] top-1/2 left-1/2  flex flex-col justify-center items-center">
            <p className="text-7xl">You are on a wrong route mate!!</p>
            <Button onClick={()=>{router.push("/")}} className="bg-blue-500 px-4 py-2 rounded-lg mt-10 text-2xl">Home</Button>
        </div>
  )
}

export default notFound
