import { useRecoilValue } from "recoil";
import { balanceAtom } from "../atoms/balance";

export const useGetBalance = () => {
    const value = useRecoilValue(balanceAtom);
    return value;
}