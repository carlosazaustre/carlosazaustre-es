"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname === "/links";

  return (
    <>
      {!bare && <Navbar />}
      <main>{children}</main>
      {!bare && <Footer />}
    </>
  );
}
