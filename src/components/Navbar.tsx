/* eslint-disable @typescript-eslint/no-misused-promises */
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef } from "react"
import { changeQty, selectCart } from "~/redux/itemSlice"
import { useAppDispatch, useAppSelector } from "~/redux/store"
import { api } from "~/utils/api"
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const dispatch = useAppDispatch()
  const { cart } = useAppSelector(selectCart)
  const cartContainer = useRef<HTMLDivElement | null>(null)
  const { mutateAsync: checkoutSession } = api.stripe.checkoutSession.useMutation();
  const { push } = useRouter();

  return (
    <nav className="w-full flex flex-initial justify-between max-w-7xl text-white items-center p-8 gap-8">
      <div className="flex items-center gap-8">
        <Link href="/about">About Us</Link>
        <Link href="/">
          <img width={100} src="https://preview.redd.it/11m3qnxxf1c41.png?auto=webp&s=6d54d033fe39a81e944b7c162f939ff2189c8caf" />
        </Link>
        <Link href="/browse">Browse Homes</Link>
      </div>
    <div className="flex gap-8">
    <button onClick={() => cartContainer.current?.classList.toggle('hidden')} className="relative">
        <img width={55} height={50} src="/cart.png" />
        <span className="absolute top-0 right-0 bg-red-400 px-2 rounded-lg text-lg">{cart.reduce((acc, item) => acc + item.qty, 0)}</span>
      </button>
      <div className="flex flex-col items-center gap-2">
          <AuthShowcase />
        </div>
    </div>
      <div ref={cartContainer} onClick={(e) => {
        if (e.target === e.currentTarget) {
          cartContainer.current?.classList.toggle('hidden');
        }
      }} className="hidden fixed w-screen h-screen z-50 inset-0 bg-[rgba(0,0,0,.5)]">
        <div className="absolute right-0 w-[550px] bg-red-700 h-full">
          <div className="pt-8 px-8">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight">Your Cart</h2>
          <p>A tour is equal to 10% of the house value.</p>
          </div>
          <div className="p-8 max-h-[75vh] overflow-y-auto">
          {cart.map(item =>
            <div key={item.name} className="grid grid-cols-4 gap-8 items-center my-4">
              <div className="col-span-2">
              <img className="w-48 h-full rounded-lg"
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                src={item.image?.includes("https") ? item.image : `/${item.image}`} />
              <p>{item.name}</p>
              <p>{item.date}</p>
              </div>
              <div className="flex flex-col items-center gap-8">
                <div className="flex">
                  <button onClick={() => dispatch(changeQty([item.name, false]))} className="p-2 bg-red-400 border">-</button>
                  <p className="p-2 border">{item.qty}</p>
                  <button onClick={() => dispatch(changeQty([item.name, true]))} className="p-2 bg-green-400 border">+</button>
                </div>
              </div>
              <p>{item.price * 0.1 * item.qty}</p>
            </div>
            )}
          </div>
          <p className="mt-6 ml-8 text-xl font-semibold">{cart.reduce((acc, item) => acc + item.price, 0)} Septims</p>
          <button onClick={async () => {
              const { checkoutUrl } = await checkoutSession(cart);
              if (checkoutUrl) {
                void push(checkoutUrl);
          }
          }} className="mt-4 ml-8 p-4 bg-red-300">Check Out</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const dropdown = useRef<HTMLDivElement | null>(null)

  function showAccountDropdown() {
    dropdown.current?.classList.toggle("hidden")
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 relative">
      <button
        className="bg-white/10 px-10 py-3 font-semibold text-white no-underline transition peer hover:bg-white/20"
        onClick={sessionData ? () => void showAccountDropdown() : () => void signIn("discord")}
      >
        {sessionData ? "My Account" : "Sign in"}
      </button>
      <div ref={dropdown} className="bg-white/10 w-full absolute -bottom-20 hidden peer-hover:bg-white/20">
        <Link href="/account"><p className="hover:bg-white/30 p-2"><span className="ml-2">My Orders</span></p></Link>
        <p onClick={() => void signOut()} className="hover:bg-white/30 p-2"><span className="ml-2">Log Out</span></p>
      </div>
    </div>
  );
};
