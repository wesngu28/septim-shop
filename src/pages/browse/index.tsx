/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

import { api } from "~/utils/api";
import HouseFilter from "./filter";

const Browse: NextPage = () => {
  const houses = api.home.getAll.useQuery();
  const [filter, setFilter] = useState({province: [] as string[], status: false, price: true, show: "upfront"})
  const liftSetFilter = (newFilter: {province: string[], status: boolean, price: boolean, show: string}) => {
    setFilter(newFilter)
  }

  return (
    <div className="flex gap-16">
      <HouseFilter filter={filter} lifted={liftSetFilter} />
      <div className="grid max-w-7xl grid-cols-5 gap-8 auto-rows-fr">
        {houses.data?.filter(house => filter.province.length === 0 || filter.province.includes(house.province as string)).filter(house => !filter.status || (filter.status === true && house.sellable === true)).sort((a, b) => {
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
                } relative rounded-lg border-2 border-transparent bg-gray-800 text-white transition-all duration-500 hover:scale-105 hover:border-gray-700`}
              >
                {!house.sellable && (
                  <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-gray-800 opacity-80">
                    <span className="rotate-45 transform text-xl font-semibold text-red-500">
                      Temporarily Unavailable
                    </span>
                  </div>
                )}
                <img
                  alt={house.name}
                  src={(JSON.parse(house.image) as string[])[0]}
                />
                <div className="flex flex-col p-2">
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
