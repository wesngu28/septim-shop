import { Item, Order } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const Home: NextPage = () => {

  const { data: sessionData } = useSession();
  const orders = api.users.getOrders.useQuery(sessionData ? sessionData?.user.id : "");
  const [order, setOrder] = useState<Order | undefined>(orders.data?.orders[0])
  const { data: items, isLoading: itemsLoading } = api.users.getItemsForOrder.useQuery(
    order?.id ? order.id : ""
  );
  useEffect(() => {
    if (orders.data?.orders && !order) {
      setOrder(orders.data.orders[0]);
    }
  }, [orders.data, order]);
  return (
    <div className="">
      <div className="flex gap items-center mb-16 gap-4 justify-center">
        <h2 className="text-3xl text-white font-semibold">Hello, {sessionData?.user.name}</h2>
        <img src={sessionData?.user.image ?? ""} alt="your profile picture" />
      </div>
      <div className="w-full flex gap-36">
        <div>
        <h2>Your Orders</h2>
        <div className="">
          {orders.data?.orders?.map((order, i) => {
            if (!order && i === 0) setOrder(order)
            return (
                <p key={order.id}>{order.date.toLocaleDateString()} {order.date.toLocaleTimeString()}</p>
            )
          })}
        </div>
        </div>
        <div className="max-h-96">
          {order ? order &&
            <div>
              <p className="text-xl font-semibold text-white">
                Your Order on {order.date.toLocaleDateString('en-US', { month: '2-digit' })}-{order.date.toLocaleDateString('en-US', { day: '2-digit' })}
              </p>
              {itemsLoading && <p>Loading Items</p>}
                {items?.items?.map((item) => {
                return (
                  <div key={item.id}>
                    <div className="flex gap-4 mt-4">
                      <img className="h-36 w-36" alt={item.product} src={item.image ?? ""} />
                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="text-lg font-semibold text-gray-200">{item.product} <span className="text-xs">x</span>{item.quantity}</p>
                          <p className="text-lg font-thin text-white">Tour on {item.date}</p>
                        </div>
                        <div className="flex h-[24px] items-center gap-2 font-thin">
            Starts at {item.price}
            <img alt="septim" className="h-full" src="/septim.webp" />
          </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
            </div> : orders.data?.orders[0] &&
            <div>
              <p>{orders.data?.orders[0].date.toISOString()}</p>
              <p>Order {orders.data?.orders[0].id}</p>
              {itemsLoading && <p>Loading Items</p>}
                {items?.items?.map((item) => {
                return (
                  <div key={item.id}>
                    <p>{item.product}</p>
                    <p>{item.quantity}</p>
                    <p>{item.price}</p>
                  </div>
                  );
                })}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Home;