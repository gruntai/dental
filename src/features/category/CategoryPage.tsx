"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Category from "./Category";

const clothingItems = [
  {
    name: "Shirts",
    image: "tshirt.png", // Parent image
    link: "/categories/shirts",
    categories: [
      {
        name: "Dress Shirts",
        image: "tshirt.png",
        link: "/categories/shirts/dress",
      }, // Matches parent
      {
        name: "Polo Shirts",
        image: "tshirt.png",
        link: "/categories/shirts/polo",
      }, // Matches parent
      {
        name: "T-Shirts",
        image: "tshirt.png",
        link: "/categories/shirts/t-shirts",
      }, // Matches parent
      {
        name: "Flannel Shirts",
        image: "tshirt.png",
        link: "/categories/shirts/flannel",
      }, // Matches parent
    ],
  },
  {
    name: "Pants",
    image: "jeans.png", // Parent image
    link: "/categories/pants",
    categories: [
      {
        name: "Dress Pants",
        image: "jeans.png",
        link: "/categories/pants/dress",
      }, // Matches parent
      {
        name: "Casual Pants",
        image: "jeans.png",
        link: "/categories/pants/casual",
      }, // Matches parent
      { name: "Jeans", image: "jeans.png", link: "/categories/pants/jeans" }, // Matches parent
      { name: "Khakis", image: "jeans.png", link: "/categories/pants/khakis" }, // Matches parent
      {
        name: "Joggers",
        image: "jeans.png",
        link: "/categories/pants/joggers",
      }, // Matches parent
    ],
  },
  {
    name: "Suits & Formal Wear",
    image: "suit.png", // Parent image
    link: "/categories/suits",
    categories: [
      { name: "Full Suits", image: "suit.png", link: "/categories/suits/full" }, // Matches parent
      { name: "Blazers", image: "suit.png", link: "/categories/suits/blazers" }, // Matches parent
      {
        name: "Waistcoats (Vests)",
        image: "suit.png",
        link: "/categories/suits/waistcoats",
      }, // Matches parent
      { name: "Tuxedos", image: "suit.png", link: "/categories/suits/tuxedos" }, // Matches parent
    ],
  },
  {
    name: "Dresses",
    image: "dress.png", // Parent image
    link: "/categories/dresses",
    categories: [
      {
        name: "Evening Gowns",
        image: "dress.png",
        link: "/categories/dresses/evening",
      }, // Matches parent
      {
        name: "Cocktail Dresses",
        image: "dress.png",
        link: "/categories/dresses/cocktail",
      }, // Matches parent
      {
        name: "Casual Dresses",
        image: "dress.png",
        link: "/categories/dresses/casual",
      }, // Matches parent
      {
        name: "Wedding Dresses",
        image: "dress.png",
        link: "/categories/dresses/wedding",
      }, // Matches parent
    ],
  },
  {
    name: "Skirts",
    image: "skirt.png", // Parent image
    link: "/categories/skirts",
    categories: [
      {
        name: "Formal Skirts",
        image: "skirt.png",
        link: "/categories/skirts/formal",
      }, // Matches parent
      {
        name: "Casual Skirts",
        image: "skirt.png",
        link: "/categories/skirts/casual",
      }, // Matches parent
      {
        name: "Pleated Skirts",
        image: "skirt.png",
        link: "/categories/skirts/pleated",
      }, // Matches parent
    ],
  },
  {
    name: "Coats & Jackets",
    image: "raincoat.png", // Parent image
    link: "/categories/coats-jackets",
    categories: [
      {
        name: "Winter Coats",
        image: "raincoat.png",
        link: "/categories/coats-jackets/winter",
      }, // Matches parent
      {
        name: "Leather Jackets",
        image: "raincoat.png",
        link: "/categories/coats-jackets/leather",
      }, // Matches parent
      {
        name: "Raincoats",
        image: "raincoat.png",
        link: "/categories/coats-jackets/raincoats",
      }, // Matches parent
      {
        name: "Blazers",
        image: "raincoat.png",
        link: "/categories/coats-jackets/blazers",
      }, // Matches parent
    ],
  },
  {
    name: "Sweaters & Knits",
    image: "sweater.png", // Parent image
    link: "/categories/sweaters",
    categories: [
      {
        name: "Wool Sweaters",
        image: "sweater.png",
        link: "/categories/sweaters/wool",
      }, // Matches parent
      {
        name: "Cotton Sweaters",
        image: "sweater.png",
        link: "/categories/sweaters/cotton",
      }, // Matches parent
      {
        name: "Cardigans",
        image: "sweater.png",
        link: "/categories/sweaters/cardigans",
      }, // Matches parent
    ],
  },
  {
    name: "Bedding & Linens",
    image: "double-bed.png", // Parent image
    link: "/categories/bedding",
    categories: [
      {
        name: "Bed Sheets",
        image: "double-bed.png",
        link: "/categories/bedding/sheets",
      }, // Matches parent
      {
        name: "Pillowcases",
        image: "double-bed.png",
        link: "/categories/bedding/pillowcases",
      }, // Matches parent
      {
        name: "Comforters",
        image: "double-bed.png",
        link: "/categories/bedding/comforters",
      }, // Matches parent
      {
        name: "Duvet Covers",
        image: "double-bed.png",
        link: "/categories/bedding/duvet-covers",
      }, // Matches parent
    ],
  },
  {
    name: "Curtains & Drapes",
    image: "curtains.png", // Parent image
    link: "/categories/curtains",
    categories: [
      {
        name: "Sheer Curtains",
        image: "curtains.png",
        link: "/categories/curtains/sheer",
      }, // Matches parent
      {
        name: "Blackout Curtains",
        image: "curtains.png",
        link: "/categories/curtains/blackout",
      }, // Matches parent
      {
        name: "Decorative Drapes",
        image: "curtains.png",
        link: "/categories/curtains/decorative",
      }, // Matches parent
    ],
  },
  {
    name: "Delicates & Specialty Items",
    image: "lightweight.png", // Parent image
    link: "/categories/delicates",
    categories: [
      {
        name: "Wedding Dresses",
        image: "lightweight.png",
        link: "/categories/delicates/wedding-dresses",
      }, // Matches parent
      {
        name: "Fur Coats",
        image: "lightweight.png",
        link: "/categories/delicates/fur-coats",
      }, // Matches parent
      {
        name: "Silk Scarves",
        image: "lightweight.png",
        link: "/categories/delicates/silk-scarves",
      }, // Matches parent
    ],
  },
];

function CategoryPage() {
  const pathname = usePathname();
  const categoryObj = clothingItems.find((item) =>
    item.link.includes(pathname)
  );
  console.log(categoryObj);

  return (
    <div className="space-y-5">
      <Link
        href="/overview"
        className={buttonVariants({
          className:
            "bg-white hover:bg-white border-black border text-sm font-semibold !text-black rounded-[5px] sm:h-8 !py-0 px-4",
        })}
      >
        Back To Main{" "}
      </Link>
      <p className="text-2xl font-semibold text-[#3D3D41]">
        Select an option from below to create new order
      </p>
      <Category data={categoryObj?.categories! || []} newOrder={true} />
    </div>
  );
}

export default CategoryPage;
