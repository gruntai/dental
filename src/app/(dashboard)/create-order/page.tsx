import Category from "@/features/category/Category";
import React from "react";

function CreateOrder() {
  return (
    <div className="space-y-10">
      <p className="text-2xl font-semibold text-[#3D3D41]">
        Select an option from below to create new order{" "}
      </p>
      <Category data={clothingItems} />
    </div>
  );
}

export default CreateOrder;

const clothingItems = [
  {
    name: "Shirts",
    image: "tshirt.png",
    link: "/categories/shirts", // Added link
    categories: [
      {
        name: "Dress Shirts",
        image: "dress-shirts.png",
        link: "/shirts/dress",
      },
      { name: "Polo Shirts", image: "polo-shirts.png", link: "/shirts/polo" },
      { name: "T-Shirts", image: "t-shirts.png", link: "/shirts/t-shirts" },
      {
        name: "Flannel Shirts",
        image: "flannel-shirts.png",
        link: "/shirts/flannel",
      },
    ],
  },
  {
    name: "Pants",
    image: "jeans.png",
    link: "/categories/pants", // Added link
    categories: [
      { name: "Dress Pants", image: "dress-pants.png", link: "/pants/dress" },
      {
        name: "Casual Pants",
        image: "casual-pants.png",
        link: "/pants/casual",
      },
      { name: "Jeans", image: "jeans.png", link: "/pants/jeans" },
      { name: "Khakis", image: "khakis.png", link: "/pants/khakis" },
      { name: "Joggers", image: "joggers.png", link: "/pants/joggers" },
    ],
  },
  {
    name: "Suits & Formal Wear",
    image: "suit.png",
    link: "/categories/suits", // Added link
    categories: [
      { name: "Full Suits", image: "full-suits.png", link: "/suits/full" },
      { name: "Blazers", image: "blazers.png", link: "/suits/blazers" },
      {
        name: "Waistcoats (Vests)",
        image: "waistcoats.png",
        link: "/suits/waistcoats",
      },
      { name: "Tuxedos", image: "tuxedos.png", link: "/suits/tuxedos" },
    ],
  },
  {
    name: "Dresses",
    image: "dress.png",
    link: "/categories/dresses", // Added link
    categories: [
      {
        name: "Evening Gowns",
        image: "evening-gowns.png",
        link: "/dresses/evening",
      },
      {
        name: "Cocktail Dresses",
        image: "cocktail-dresses.png",
        link: "/dresses/cocktail",
      },
      {
        name: "Casual Dresses",
        image: "casual-dresses.png",
        link: "/dresses/casual",
      },
      {
        name: "Wedding Dresses",
        image: "wedding-dresses.png",
        link: "/dresses/wedding",
      },
    ],
  },
  {
    name: "Skirts",
    image: "skirt.png",
    link: "/categories/skirts", // Added link
    categories: [
      {
        name: "Formal Skirts",
        image: "formal-skirts.png",
        link: "/skirts/formal",
      },
      {
        name: "Casual Skirts",
        image: "casual-skirts.png",
        link: "/skirts/casual",
      },
      {
        name: "Pleated Skirts",
        image: "pleated-skirts.png",
        link: "/skirts/pleated",
      },
    ],
  },
  {
    name: "Coats & Jackets",
    image: "raincoat.png",
    link: "/categories/coats-jackets", // Added link
    categories: [
      {
        name: "Winter Coats",
        image: "winter-coats.png",
        link: "/coats-jackets/winter",
      },
      {
        name: "Leather Jackets",
        image: "leather-jackets.png",
        link: "/coats-jackets/leather",
      },
      {
        name: "Raincoats",
        image: "raincoats.png",
        link: "/coats-jackets/raincoats",
      },
      { name: "Blazers", image: "blazers.png", link: "/coats-jackets/blazers" },
    ],
  },
  {
    name: "Sweaters & Knits",
    image: "sweater.png",
    link: "/categories/sweaters", // Added link
    categories: [
      {
        name: "Wool Sweaters",
        image: "wool-sweaters.png",
        link: "/sweaters/wool",
      },
      {
        name: "Cotton Sweaters",
        image: "cotton-sweaters.png",
        link: "/sweaters/cotton",
      },
      {
        name: "Cardigans",
        image: "cardigans.png",
        link: "/sweaters/cardigans",
      },
    ],
  },
  {
    name: "Bedding & Linens",
    image: "double-bed.png",
    link: "/categories/bedding", // Added link
    categories: [
      { name: "Bed Sheets", image: "bed-sheets.png", link: "/bedding/sheets" },
      {
        name: "Pillowcases",
        image: "pillowcases.png",
        link: "/bedding/pillowcases",
      },
      {
        name: "Comforters",
        image: "comforters.png",
        link: "/bedding/comforters",
      },
      {
        name: "Duvet Covers",
        image: "duvet-covers.png",
        link: "/bedding/duvet-covers",
      },
    ],
  },
  {
    name: "Curtains & Drapes",
    image: "curtains.png",
    link: "/categories/curtains", // Added link
    categories: [
      {
        name: "Sheer Curtains",
        image: "sheer-curtains.png",
        link: "/curtains/sheer",
      },
      {
        name: "Blackout Curtains",
        image: "blackout-curtains.png",
        link: "/curtains/blackout",
      },
      {
        name: "Decorative Drapes",
        image: "decorative-drapes.png",
        link: "/curtains/decorative",
      },
    ],
  },
  {
    name: "Delicates & Specialty Items",
    image: "lightweight.png",
    link: "/categories/delicates", // Added link
    categories: [
      {
        name: "Wedding Dresses",
        image: "wedding-dresses.png",
        link: "/delicates/wedding-dresses",
      },
      {
        name: "Fur Coats",
        image: "fur-coats.png",
        link: "/delicates/fur-coats",
      },
      {
        name: "Silk Scarves",
        image: "silk-scarves.png",
        link: "/delicates/silk-scarves",
      },
    ],
  },
  {
    name: "Custom",
    image: "custom.png",
    link: "/categories/custom",
  },
];
