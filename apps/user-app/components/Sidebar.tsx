"use client"
import { usePathname, useRouter } from "next/navigation"

interface SidebarProps{
    href: string,
    icon: React.ReactNode,
    title:string
}
const Sidebar = ({ href, icon, title }: SidebarProps) => {
    const router = useRouter();
    const pathName = usePathname();
    const selected=pathName===href
  return (
      <div  className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer p-2 gap-2 font-semibold mt-3 items-center`} onClick={() => router.push(href)}>
          <div  className={`${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer`}>
              {icon}
          </div>
          <div className={`${selected ? "text-[#6a51a6]" : "text-slate-500"} text-lg`}>
              {title}
          </div>
    </div>
  )
}

export default Sidebar