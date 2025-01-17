import { CarouselInfo } from "@/features/auth/carouselInfo";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh flex">
      <div className="flex flex-col items-center gap-4 p-6 md:px-10 py-10 w-full lg:w-3/5">
        <div className="flex flex-1 flex-col gap-20 items-center justify-center w-full">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <Image
                src="/assets/images/logos/grunt_logo.png"
                alt="grunt logo"
                width={130}
                height={30}
              />
            </Link>
          </div>
          <div className="w-full max-w-2xl 2xl:max-w-4xl">{children}</div>
        </div>
      </div>
      <div className=" hidden h-screen fixed top-0 right-0 lg:block lg:w-2/5 bg-[#F5F8FF]">
        <CarouselInfo />
      </div>
    </div>
  );
}

export default Layout;
