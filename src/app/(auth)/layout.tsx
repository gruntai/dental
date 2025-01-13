import { CarouselInfo } from "@/features/auth/carouselInfo";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh flex">
      <div className="flex flex-col items-center gap-4 p-6 md:p-10 w-full lg:w-3/5">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Image
              src="/assets/images/logos/grunt_logo.png"
              alt="grunt logo"
              width={150}
              height={30}
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center w-full">
          <div className="w-full max-w-3xl">{children}</div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block lg:w-2/5">
        <CarouselInfo />
      </div>
    </div>
  );
}

export default Layout;
