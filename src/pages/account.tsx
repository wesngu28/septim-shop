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
        <img src={sessionData?.user.image} />
      </div>
      <div className="w-full flex justify-between gap-36">
        <div>
        <h2>Your Orders</h2>
        <div className="">
          {orders.data?.orders?.map((order, i) => {
            if (!order && i === 0) setOrder(order)
            return (
                <p>{order.userId}</p>
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
                      <img className="h-36 w-36" src={item.image} />
                      <div>
                        <p className="text-lg font-semibold text-gray-200">{item.product}</p>
                        <p className="text-lg"><span className="text-xs">x</span>{item.quantity}</p>
                        <p className="text-lg">{item.price}</p>
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