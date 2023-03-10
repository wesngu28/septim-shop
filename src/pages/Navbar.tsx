import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="w-full flex flex-initial justify-between max-w-7xl text-white items-center p-8 gap-8">
      <Link href="/about">About Us</Link>
      <Link href="/">
        <img width={100} src="https://preview.redd.it/11m3qnxxf1c41.png?auto=webp&s=6d54d033fe39a81e944b7c162f939ff2189c8caf" />
      </Link>
      <Link href="/browse">Browse Homes</Link>
    </nav>
  )
}

export default Navbar