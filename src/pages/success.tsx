import type { NextPage } from "next";
import { useEffect } from "react";
import { useAppDispatch } from "~/redux/store"
import { clearCart } from "~/redux/itemSlice";
import Link from "next/link";

const Success: NextPage = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(clearCart())
  }, [dispatch])

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-3xl text-white font-semibold tracking-tight">Order Successful!</h2>
      <Link href="/account">
        <button className="bg-white/10 p-2 rounded-md">
          View your Orders
        </button>
      </Link>
    </div>
  );
};

export default Success;