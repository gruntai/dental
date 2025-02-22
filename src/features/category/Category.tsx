import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Category({
  data,
  newOrder,
}: {
  newOrder?: boolean;
  data: any[];
}) {
  return (
    <div className="flex flex-wrap -mx-2 sm:-mx-5">
      {data.map((item, index) => (
        <div
          key={index}
          className="px-2 sm:px-5 w-1/2 sm:w-1/3 xl:w-1/4 2xl:w-1/5 mb-10 flex" // Add `flex` here
        >
          <Link
            href={newOrder ? "/new-order" : item.link}
            className="bg-[#F7F7F7] border border-black rounded-[10px] px-2 pb-3 pt-5 md:py-7 w-full flex flex-col"
          >
            <Image
              src={`/assets/images/clothes/${item.image}`}
              alt={`${item.name}`}
              width={70}
              height={70}
              className="mx-auto mb-5"
            />
            {/* Add `flex flex-col` here */}
            <p className="font-semibold text-sm  sm:text-base lg:text-lg 2xl:text-[22px] mb-2 text-[#494949] text-center break-words">
              {" "}
              {/* Add `break-words` to handle long text */}
              {item.name}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Category;
