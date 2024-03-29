import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 text-center max-w-7xl">
        <h1 className="text-5xl font-extrabold tracking-tight text-white">
          Imperial Housing Authority
        </h1>
        <h2 className="mb-16 text-2xl tracking-tight text-gray-300">
          Browse, purchase, or earn beautiful homes across Cyrodiil and Skyrim.
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-12">
          <Link href="/listing/cheydinhal">
            <div className="p-4 text-left text-white">
              <img className="rounded-md" src="https://images.uesp.net/5/5a/OB-place-Cheydinhal_House_For_Sale.jpg" />
              <p className="mt-2 font-semibold">Cheydinhal</p>
              <p className="font-sm font-thin">15,000 septims</p>
            </div>
          </Link>
          <Link href="/listing/honeyside">
            <div className="p-4 text-left text-white">
              <img src="https://images.uesp.net/3/31/SR-place-Honeyside.jpg" />
              <p className="mt-2 font-semibold">Honeyside, Riften</p>
              <p className="font-sm font-thin">8,000 septims</p>
            </div>
          </Link>
          <Link href="/listing/proudspire">
            <div className="p-4 text-left text-white">
              <img src="https://images.uesp.net/1/19/SR-place-Proudspire_Manor.jpg" />
              <p className="mt-2 font-semibold">Proudspire, Solitude</p>
              <p className="font-sm font-thin">25,000 septims</p>
            </div>
          </Link>
        </div>
        <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
          <div
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          >
            <h3 className="text-2xl font-bold">Buy and browse</h3>
            <div className="text-lg text-left">
              The Empire wants to make it easier for all of its residents to freely
              move across imperial borders. Easily browse and purchase homes with our
              simple interface.
            </div>
          </div>
          <div
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          >
            <h3 className="text-2xl font-bold">Homes for all walks</h3>
            <div className="text-lg text-left">
              From homes befitting lovers of all things dwemer, to vampires, to
              the growing family, we list and sell them all at a fair price.
            </div>
          </div>
          <div
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          >
            <h3 className="text-2xl font-bold">Safety is guaranteed</h3>
            <div className="text-lg text-left">
              Tamriel is a dangerous place, and we ensure homes are maintained,
              protected, and offer insurance on the home, as well as its
              occupants.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;