
import { Button } from "./button";

interface AppbarProps{
  user?: {
    name?: string | null;
  },
  onSignin:()=>void,
  onSignout:()=>void,
}
export const Appbar = ({user,onSignin,onSignout}:AppbarProps) => {
  return (
    <div className="h-16 px-10 rounded-b-xl border-b border-slate-400 flex justify-between items-center">
      <div>
        <p className="text-3xl font-semibold">Paytm</p>
        
      </div>
      <Button onClick={user?onSignout:onSignin}  className="bg-orange-400 font-semibold hover:bg-orange-600 px-4 py-2 rounded-xl">{user?"Logout":"Login"}</Button>
    </div>
    
  );
};
