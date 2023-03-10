import Error from "next/error";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectHouse } from "~/redux/houseSlice";
import { api } from "~/utils/api";

const Listing = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading } = api.home.get.useQuery(slug as string)

  if (isLoading) {
    return <p>Retrieving listing...</p>
  }

  if (!data) {
    console.log('wtf !!')
    return <Error statusCode={404} />
  }
  return (
    data &&
    <div className="container flex max-w-3xl flex-col items-center justify-center gap-4 px-4 py-16 text-white">
      <h2 className="text-4xl font-semibold tracking-tighter">{data.name}</h2>
      <div className="grid grid-cols-2 gap-2">
        <div className="row-span-2">
          <img
            className="h-full w-full object-cover"
            src={(JSON.parse(data.image) as string[])[0]}
          />
        </div>
        <img src="https://spicyeconomics.com/wp-content/uploads/2020/07/ProudspireManorPride-7-NA-Jaclynn-1-1024x576.png" />
        <img src="https://spicyeconomics.com/wp-content/uploads/2020/07/ProudspireManorPride-2-EU-Neb314-1-1024x576.png" />
      </div>
      <div className="w-full">
      <p className="max-w-lg mb-8">{data.description}</p>
      <p className="w-full text-left">Starts at {data.price}</p>
      </div>
      <div>
        <p>Interested? Schedule a tour.</p>
      </div>
    </div>
  );
};

export default Listing;
