"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button, buttonVariants } from "@/components/ui/button";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const [isOpened, setIsOpened] = React.useState(false);
  const pathname = usePathname();
  return (
    <div className="min-h-svh flex relative">
      {!pathname.includes("overview") && (
        <div className="bg-white/85 absolute h-screen w-screen inset-0 flex items-center justify-center z-[9999999999999999] text-center">
          <div className="max-w-sm space-y-3">
            <p className="text-2xl">Activate to View</p>
            {pathname.includes("calendar") ? (
              <p className="text-lg">
                Your calendar is almost ready.
                <br /> Just Activate your account to get started.
              </p>
            ) : (
              <p className="text-lg">
                This feature is unavailable in demo mode.
                <br /> Create an account to continue.
              </p>
            )}
            <Link
              className={buttonVariants({
                className: "w-fit h-8 text-gray-200",
              })}
              href="https://start.getgrunt.co/signup"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
      <Toaster />
      <Sidebar isOpened={isOpened} handleOpenState={setIsOpened} />
      <Navbar />
      <div
        className={cn("mt-28 px-5 lg:pl-80 w-full duration-500 ", {
          "lg:pl-20": isOpened,
        })}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
