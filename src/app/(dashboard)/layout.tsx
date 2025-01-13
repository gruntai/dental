import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh flex">
      <Sidebar />
      <div className="lg:pl-[350px] w-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default Layout;
