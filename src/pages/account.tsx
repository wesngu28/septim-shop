/* eslint-disable @next/next/no-img-element */
import type { Order } from "@prisma/client";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const orders = api.users.getOrders.useQuery(
    sessionData ? sessionData?.user.id : ""
  );
  const [order, setOrder] = useState<Order | undefined>(orders.data?.orders[0]);
  const { data: items, isLoading: itemsLoading } =
    api.users.getItemsForOrder.useQuery(order?.id ? order.id : "");
  useEffect(() => {
    if (orders.data?.orders && !order) {
      setOrder(orders.data.orders[0]);
    }
  }, [orders.data, order]);
  return (
    <div className="absolute top-1/4">
      <div className="gap mb-16 flex items-center justify-center gap-4">
        <h2 className="text-3xl font-semibold text-white">
          Hello, {sessionData?.user.name}
        </h2>
        <img src={sessionData?.user.image ?? ""} alt="your profile picture" />
      </div>
      <div className="flex w-full gap-36">
        <div className="">
          <h2 className="bg-yellow-700 p-2 rounded-md mb-4">Your Orders</h2>
          <div className="flex flex-col gap-2">
            {orders.data?.orders?.map((order, i) => {
              if (!order && i === 0) setOrder(order);
              return (
                <button onClick={() => setOrder(order)} key={order.id}>
                  {order.date.toLocaleDateString()}{" "}
                  {order.date.toLocaleTimeString()}
                </button>
              );
            })}
          </div>
        </div>
        <div className="max-h-[36rem] w-96 pr-8 overflow-x-hidden overflow-y-auto">
          {order
            ? order && (
                <div className="">
                  <p className="text-xl font-semibold text-white">
                    Your Order on{" "}
                    {order.date.toLocaleDateString("en-US", {
                      month: "2-digit",
                    })}
                    -
                    {order.date.toLocaleDateString("en-US", { day: "2-digit" })}
                  </p>
                  {itemsLoading && <p>Loading Items</p>}
                  {items?.items?.map((item) => {
                    return (
                      <div key={item.id}>
                        <div className="mt-4 flex gap-4">
                          <img
                            className="h-28 w-auto"
                            alt={item.product}
                            src={item.image ?? ""}
                          />
                          <div className="flex flex-col justify-between">
                            <div>
                              <p className="text-lg font-semibold text-gray-200">
                                {item.product}{" "}
                                <span className="text-xs">x</span>
                                {item.quantity}
                              </p>
                              <p className="text-lg font-thin text-white">
                                Tour {item.date}
                              </p>
                            </div>
                            <div className="flex h-[24px] items-center gap-2 font-thin">
                              Starts at {item.price}
                              <img
                                alt="septim"
                                className="h-full"
                                src="/septim.webp"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            : orders.data?.orders[0] && (
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
              )}
        </div>
      </div>
    </div>
  );
};

export default Home;
