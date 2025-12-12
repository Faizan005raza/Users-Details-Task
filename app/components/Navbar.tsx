import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="text-white text-3xl bg-amber-950 flex justify-between">
        <Link href="/" className="px-3 py-2 hover:text-red-500 cursor-pointer">
          Home
        </Link>
        <Link
          href="/users"
          className="px-3 py-2 hover:text-red-500 cursor-pointer"
        >
          Users
        </Link>
        <Link
          href="/country"
          className="px-3 py-2 hover:text-red-500 cursor-pointer"
        >
          Country
        </Link>
         <Link
          href="/dashboard"
          className="px-3 py-2 hover:text-red-500 cursor-pointer"
        >
          Dashboard
        </Link>
        <Link
          href="/about"
          className="px-3 py-2 hover:text-red-500 cursor-pointer"
        >
          About
        </Link>
      </div>
    </>
  );
}
