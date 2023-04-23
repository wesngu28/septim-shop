/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Link from "next/link";
import {  useState } from "react";

import { api } from "~/utils/api";
import HouseFilter from "../components/Filter";

const Browse: NextPage = () => {
  const houses = api.home.getAll.useQuery();
  const [filter, setFilter] = useState({province: [] as string[], status: false, price: true, show: "upfront"})
  const liftSetFilter = (newFilter: {province: string[], status: boolean, price: boolean, show: string}) => {
    setFilter(newFilter)
  }

  return (
    <div className="w-full p-4 sm:p-0 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:w-auto block sm:flex gap-16">
      <HouseFilter filter={filter} lifted={liftSetFilter} />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:max-w-7xl gap-8 auto-rows-fr">
        {houses.data?.filter(house => filter.province.length === 0 || filter.province.includes(house.province)).filter(house => !filter.status || (filter.status === true && house.sellable === true)).sort((a, b) => {
        let aPrice = a.price
        let bPrice = b.price
        switch (filter.show) {
          case "upgrade":
            aPrice = a.addPrice;
            bPrice = b.addPrice;
            break;
          case "total":
            aPrice = a.price + a.addPrice;
            bPrice = b.price + b.addPrice;
            break;
          default:
            break;
        }
        if (aPrice === 0) {
          return 1;
        } else if (bPrice === 0) {
          return -1;
        } else {
          return filter.price ? aPrice - bPrice : bPrice- aPrice;
        }
      }).map((house) => {
          return (
            <Link href={`/listing/${house.slug}`} key={house.name}>
              <div
                className={`${
                  house.sellable ? "opacity-100" : "opacity-50"
                } relative rounded-lg h-80 bg-gray-800 text-white transition-all duration-500 hover:scale-105`}
              >
                {!house.sellable && (
                  <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-gray-800 opacity-80">
                    <span className="rotate-45 transform text-xl text-center font-semibold text-red-500">
                      Temporarily Unavailable
                    </span>
                  </div>
                )}
                <img
                  alt={house.name}
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  src={house.image[0]?.includes("https") ? house.image[0] : `/${house.image[0]}`}
                />
                <div className="flex flex-col p-2 ml-2">
                  <p className="mt-4 text-xl font-semibold">{house.name}</p>
                  <div className="ju mt-4 flex h-[24px] items-center gap-2 font-thin">{filter.show === "upfront" ? house.price : filter.show === "upgrade" ? house.addPrice : house.price + house.addPrice}
                    <img alt="septim" className="h-full" src="/septim.webp" />
                  </div>
                  <p className="mt-2 font-thin">
                    {house.locator}, {house.province}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
          {houses.data  && Array.from({ length: 5 - (houses.data?.length % 5 || 5) }).map((_, index) => (
    <div key={`empty-${index}`} style={{ visibility: "hidden" }} />
  ))}
      </div>
    </div>
  );
};

export default Browse;
