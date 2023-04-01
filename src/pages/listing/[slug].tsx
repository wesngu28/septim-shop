import Error from "next/error";
import { useRouter } from "next/router";
import { ChangeEvent, SetStateAction, useState } from "react";
import { addItem } from "~/redux/itemSlice";
import { useAppDispatch } from "~/redux/store";
import { api } from "~/utils/api";

const Listing = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [date, setDate] = useState("");

  const handleDateChange = (event: ChangeEvent) => {
    setDate((event.target as HTMLInputElement).value);
  };
  const dispatch = useAppDispatch()

  const { data, isLoading } = api.home.get.useQuery(slug as string);

  if (isLoading) {
    return <p>Retrieving listing...</p>;
  }

  if (!data) {
    return <Error statusCode={404} />;
  }
  return (
    data && (
      <div className="container flex max-w-5xl flex-col items-center justify-center gap-4 px-4 py-16 text-white">
        <h2 className="text-4xl font-semibold tracking-tighter">{data.name}</h2>
        <div className="grid h-96 grid-cols-2 gap-2">
          <div className="row-span-2 h-96">
            <img
              className="h-full w-full object-cover"
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              src={data.image[0]?.includes("https") ? data.image[0] : `/${data.image[0]}`}
            />
          </div>
          <img
            className="h-48 w-full object-cover"
            src="https://spicyeconomics.com/wp-content/uploads/2020/07/ProudspireManorPride-7-NA-Jaclynn-1-1024x576.png"
          />
          <img
            className="h-48 w-full object-cover"
            src="https://spicyeconomics.com/wp-content/uploads/2020/07/ProudspireManorPride-2-EU-Neb314-1-1024x576.png"
          />
        </div>
        <div className="my-4 grid w-full grid-cols-4 place-items-center">
          <p className="w-full text-left">Listed by {data.seller}</p>
          <p>
            {data.locator}, {data.province}
          </p>
          {data.price ? <div className="flex h-[24px] items-center gap-2 font-thin">
            Starts at {data.price}
            <img alt="septim" className="h-full" src="/septim.webp" />
          </div> : <div className="flex h-[24px] items-center gap-2 font-thin">
            Requires Task
          </div>}
          <p>{data.upgrades.length} Upgrades</p>
        </div>
        <div className="flex flex-col items-center gap-4 my-4">
          <input type={"date"}         id="date"
        name="date"
        value={date}
        onChange={handleDateChange} className="text-black" />
          <button
            onClick={() => dispatch(
              addItem({
                name: data.name,
                price: data.price,
                image: data.image[0] as string,
                qty: 1,
                date: date
              })
            )}
            disabled={!data.sellable || !date}
            className={`${
              !data.sellable || !date ? "opacity-40" : ""
            } rounded-lg bg-blue-900 p-3`}
          >
            Add to Tour Cart
          </button>
          <div>
            {data.sellable ? (
              <p>Interested? Schedule a tour.</p>
            ) : (
              <p>
                We apologize, due to conditions in Skyrim, this home is
                currently not sellable.
              </p>
            )}
          </div>
        </div>
        <div className="w-full my-4">
          <p className="mt-4 mb-16">{data.description}</p>
          {data.askingQuest && <p className="mt-4 mb-2">{data.askingQuest}
          </p>}
          <p className="mt-4 mb-2">
            {data.name} has {data.upgrades.length} paths of
            improvement.
          </p>
          <div className="grid grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              {data.upgrades.map((upgrade) => {
                return (
                  <>
                    <div>{upgrade.upgrade}</div>
                    <div className="flex h-[24px] items-center gap-2 font-thin">
                      {upgrade.price}
                      <img alt="septim" className="h-full" src="/septim.webp" />
                    </div>
                  </>
                );
              })}
            </div>
            <div className="rounded-lg border-2 border-gray-500 p-6">
              <h2 className="mb-2 text-2xl">Imperial Certified</h2>
              <p>
                This home is certified safe and liveable by the Imperial Housing
                Authority, as of 4E 201.
              </p>
              <img
                className="m-auto mt-8 h-[100px]"
                src="https://preview.redd.it/11m3qnxxf1c41.png?auto=webp&s=6d54d033fe39a81e944b7c162f939ff2189c8caf"
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Listing;
