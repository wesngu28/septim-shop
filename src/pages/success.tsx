import type { NextPage } from "next";
import { useEffect } from "react";
import { useAppDispatch } from "~/redux/store"
import { clearCart } from "~/redux/itemSlice";

const Success: NextPage = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(clearCart())
  }, [dispatch])

  return (
    <div>
      <p>Order successful!!!</p>
    </div>
  );
};

export default Success;