'use client'

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {

  const { data: session } = useSession();

  const logout = async () => {
    await signOut();
  };

  return (
    <header className="bg-indigo-700 text-white shadow relative z-50">
      <nav className="h-20 max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">YourBrand</Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium relative">
          <ul className="flex gap-6">
            {session ? (
              <>

                <li><Link href="/protected">Protected</Link></li>
                <li><button onClick={logout}>Sign out</button></li>
                <li><Link href="/non-protected">Not Protected</Link></li>
              </>
            ) : (
              <>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/non-protected">Not Protected</Link></li>
                <li><Link href="/protected">Protected</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
