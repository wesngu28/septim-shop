import Link from "next/link"
import { useRef } from "react"
import { changeQty, selectCart } from "~/redux/itemSlice"
import { useAppDispatch, useAppSelector } from "~/redux/store"

const Navbar = () => {
  const dispatch = useAppDispatch()
  const { cart } = useAppSelector(selectCart)
  const cartContainer = useRef<HTMLDivElement | null>(null)

  return (
    <nav className="w-full flex flex-initial justify-between max-w-7xl text-white items-center p-8 gap-8">
      <div className="flex items-center gap-8">
        <Link href="/about">About Us</Link>
        <Link href="/">
          <img width={100} src="https://preview.redd.it/11m3qnxxf1c41.png?auto=webp&s=6d54d033fe39a81e944b7c162f939ff2189c8caf" />
        </Link>
        <Link href="/browse">Browse Homes</Link>
      </div>
      <button onClick={() => cartContainer.current?.classList.toggle('hidden')} className="relative">
        <img width={55} height={50} src="/cart.png" />
        <span className="absolute top-0 right-0 bg-red-400 px-2 rounded-lg text-lg">{cart.reduce((acc, item) => acc + item.qty, 0)}</span>
      </button>
      <div ref={cartContainer}   onClick={(e) => {
    if (e.target === e.currentTarget) {
      cartContainer.current?.classList.toggle('hidden');
    }
  }} className="hidden fixed w-screen h-screen inset-0 bg-[rgba(0,0,0,.5)]">
        <div className="absolute right-0 w-[550px] bg-red-700 h-full">
          <div className="p-8">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight">Your Cart</h2>
          <p>A tour is equal to 10% of the house value.</p>
          </div>
          <div className="p-8">
          {cart.map(item =>
            <div key={item.name} className="grid grid-cols-4 gap-8 items-center my-4">
              <div className="col-span-2">
              <img className="w-48 h-full rounded-lg" src={item.image} />
              <p>{item.name}</p>
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar