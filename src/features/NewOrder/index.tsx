"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  ChevronUp,
  CircleDollarSignIcon,
  DollarSign,
  Grid,
  GripVertical,
  Layers,
  Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { DatePickerDemo } from "./DatePicker";

function NewOrder() {
  const [inputVal, setInputVal] = useState("");
  const [customers, setCustomers] = useState([...defaultCustomers]);
  const [isInputFocused, setIsInputFocused] = useState(false); // New state for input focus
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State for selected customer
  const searchParam = useSearchParams();
  const productName = searchParam.get("category");
  console.log(productName);

  console.log(selectedCustomer);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputVal(e.target.value);
  }

  const filteredCustomers =
    inputVal &&
    customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(inputVal.toLowerCase()) ||
        customer.email.toLowerCase().includes(inputVal.toLowerCase()) ||
        customer.phone.toLowerCase().includes(inputVal.toLowerCase())
    );

  // Function to handle customer selection
  const handleCustomerSelect = (customer) => {
    console.log(customer);

    setSelectedCustomer(customer); // Set the selected customer
    setInputVal(""); // Clear the input value
    setIsInputFocused(false); // Hide the search box
  };
  console.log(selectedCustomer);
  const [selected, setSelected] = useState("cash");
  const [stage, setStage] = useState("stage1");
  return (
    <form
      className=""
      onSubmit={(e) => {
        e.preventDefault();
        console.log("submit");
      }}
    >
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
        <div className="flex justify-center md:justify-normal flex-wrap gap-y-10">
          <div className="space-y-5 w-full xl:w-1/2 xl:mr-20">
            <p className="text-[28px] font-semibold text-[#3D3D41]">
              {stage === "stage1" && "Enter Order Information"}
              {stage === "stage2" && "Select Payment Method"}
            </p>
            {stage === "stage1" && (
              <>
                <div className="space-y-3 md:max-w-xs mb-10">
                  <div className="flex  items-center justify-between">
                    <span className="text-base">Customer information</span>
                    <span className="text-[#016FD0] text-xs font-normal">
                      New Customer?
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      className="border-[#D3D3D3] placeholder:text-[#828282] placeholder:text-xs"
                      placeholder="Enter customer name, phone number or email"
                      value={inputVal}
                      onChange={handleInputChange}
                      onFocus={() => setIsInputFocused(true)} // Set focus state to true
                      onBlur={() =>
                        setTimeout(() => setIsInputFocused(false), 100)
                      } // Set focus state to false
                    />
                    {inputVal &&
                      isInputFocused && ( // Show search box only when input is focused and has value
                        <div className="searchbox border border-gray-400 bg-white rounded-md w-3/4 h-40 max-h-80 overflow-y-auto absolute top-[calc(100%+10px)] left-0 ">
                          {!!filteredCustomers?.length ? (
                            filteredCustomers?.map((customer) => {
                              console.log(customer);

                              return (
                                <SeachOption
                                  key={customer.id}
                                  data={customer}
                                  onClick={() => handleCustomerSelect(customer)}
                                />
                              );
                            })
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              No search results.
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                </div>
                <div className="border-black border rounded-sm py-3">
                  <div className="py-3 pb-5  px-5 border-b border-black">
                    {/* customer details */}
                    <p className="text-xs font-semibold text-[#a1a1a7] mb-3 uppercase">
                      Customer Details
                    </p>
                    <div className="flex flex-wrap -mx-5 gap-y-5">
                      <div className="px-5 space-y-2 w-full  sm:w-1/2">
                        <p>Customer Name</p>
                        <Input
                          required
                          className="border-black"
                          value={selectedCustomer?.name || ""}
                          onChange={(e) =>
                            setSelectedCustomer({
                              ...selectedCustomer,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="px-5 space-y-2  w-full sm:w-1/2">
                        <p>Customer No</p>
                        <Input
                          required
                          className="border-black"
                          value={selectedCustomer?.id || ""}
                          onChange={(e) =>
                            setSelectedCustomer({
                              ...selectedCustomer,
                              id: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="px-5 space-y-2  w-full sm:w-1/2">
                        <p>Customer Email</p>
                        <Input
                          required
                          className="border-black"
                          type="email"
                          value={selectedCustomer?.email || ""}
                          onChange={(e) =>
                            setSelectedCustomer({
                              ...selectedCustomer,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="px-5 space-y-2  w-full sm:w-1/2">
                        <p>Customer Phone Number</p>
                        <Input
                          required
                          className="border-black"
                          value={selectedCustomer?.phone || ""}
                          onChange={(e) =>
                            setSelectedCustomer({
                              ...selectedCustomer,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="py-3 pb-5  px-5 border-b border-black">
                    {/* customer details */}
                    <p className="text-xs font-semibold text-[#a1a1a7] mb-3 uppercase">
                      Product Details
                    </p>
                    <div className="flex justify-between items-center mb-5">
                      {/* iamge and illustration */}
                      <div className="flex items-center gap-2">
                        <GripVertical size={16} />
                        <Layers size={16} />
                        <span>{productName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          className="bg-transparent border-black rounded-[4px]"
                        >
                          <ChevronUp />
                        </Button>
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          className="bg-transparent border-black rounded-[4px]"
                        >
                          <Trash />
                        </Button>
                      </div>
                    </div>
                    {/* additional amount */}
                    <div className="flex flex-wrap -mx-5 gap-y-5">
                      <div className="px-5 space-y-2 w-full md:w-1/2">
                        <p>Unit Price</p>
                        <div className="w-full border border-black rounded-md pl-7 bg-white relative">
                          <Input required className="border-0 outline-0" />
                          <div className="border border-black rounded-full w-6 h-6 absolute left-2 top-2 flex items-center justify-center">
                            <DollarSign size={13} />
                          </div>
                        </div>
                      </div>
                      <div className="px-5 space-y-2 w-full md:w-1/2">
                        <p>Quantity</p>
                        <div className="w-full ">
                          <Input
                            required
                            className="border-black"
                            type="number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-3 px-5">
                    {/* customer details */}
                    <p className="text-xs font-semibold text-[#a1a1a7] mb-3 uppercase">
                      Pickup & Delivery
                    </p>
                    {/* additional amount */}
                    <DeliveryOptions />
                  </div>
                </div>
              </>
            )}
            {stage == "stage2" && (
              <div className="flex items-center gap-5 flex-wrap xl:justify-between">
                <div
                  className={cn(
                    "cursor-pointer rounded-lg border border-black bg-white w-full sm:w-60 xl:w-[48%] flex items-center gap-5 py-10 duration-200",
                    {
                      "shadow-[4px_4px_rgba(0,0,0,1)]": selected == "cash",
                    }
                  )}
                  onClick={() => setSelected("cash")}
                >
                  <Image
                    src={"/assets/images/dollar.png"}
                    alt="logo"
                    className="w-20"
                    width={100}
                    height={120}
                  />
                  <div className="mt-5">
                    <div className="font-bold text-3xl">Cash</div>
                    <div className="text-[#3C3C4399] text-xl font-normal">
                      Payment
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "cursor-pointer rounded-lg border border-black bg-white w-full sm:w-60 xl:w-[48%] flex items-center gap-5 py-10 duration-200",
                    {
                      "shadow-[4px_4px_rgba(0,0,0,1)]": selected == "credit",
                    }
                  )}
                  onClick={() => setSelected("credit")}
                >
                  <Image
                    src={"/assets/images/dollar.png"}
                    alt="logo"
                    className="w-20"
                    width={100}
                    height={120}
                  />
                  <div className="mt-5">
                    <div className="font-bold text-3xl">Credit</div>
                    <div className="text-[#3C3C4399] text-xl font-normal">
                      Payment
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "relative overflow-hidden cursor-pointer px-10 rounded-lg border border-black bg-white w-full sm:w-[500px] xl:w-full flex items-center gap-5 py-10 duration-200",
                    {
                      "shadow-[4px_4px_rgba(0,0,0,1)]": selected == "later",
                    }
                  )}
                  onClick={() => setSelected("later")}
                >
                  <Image
                    src={"/assets/images/seed.png"}
                    alt="logo"
                    className="w-64 absolute left-[65%] bottom-[50%] rotate-45 hidden sm:block"
                    width={256}
                    height={200}
                  />
                  <div className="mt-5">
                    <div className="font-bold text-3xl">
                      Receivables / Pay Later
                    </div>
                    <div className="text-[#3C3C4399] text-xl font-normal">
                      Select this option to add this order to receivables.
                    </div>
                  </div>
                </div>{" "}
                {selected == "later" && (
                  <div className="w-full space-y-2">
                    <p className="font-bold">
                      Select due date for this payment
                    </p>
                    <DatePickerDemo />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* order summary */}
          <div className="w-full md:max-w-sm xl:w-1/2">
            <h2 className="mb-10 text-[#907C65] text-4xl font-bold">
              Order Summary
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#948D85] text-lg font-medium">
                  Quantity
                </span>
                <span className="text-[#544330] text-lg font-medium">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#948D85] text-lg font-medium">
                  Sub Total
                </span>
                <span className="text-[#544330] text-lg font-medium">
                  $25.00
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#948D85] text-lg font-medium">
                  Sales Tax (13%)
                </span>
                <span className="text-[#544330] text-lg font-medium">
                  $3.25
                </span>
              </div>
            </div>
            <hr className="border-black my-10" />
            <div className="flex justify-between items-center mb-10">
              <span className="text-[#948D85] text-lg font-medium">
                Payment Due
              </span>
              <span className="text-[#544330] text-lg font-medium">$28.25</span>
            </div>
            {stage == "stage2" && (
              <Link
                href={"/overview"}
                className={buttonVariants({
                  className: "w-full !rounded-3xl mb-3",
                })}
                type="submit"
              >
                Place Order
              </Link>
            )}
            {stage == "stage1" && (
              <Button
                className="w-full rounded-3xl mb-3"
                onClick={() => setStage("stage2")}
              >
                Next
              </Button>
            )}
            <Button
              variant={"outline"}
              className={"w-full !rounded-3xl border-black disabled:opacity-20"}
              disabled={stage == "stage1"}
              onClick={() => setStage("stage1")}
            >
              {" "}
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

function SeachOption({ data, onClick }) {
  return (
    <div
      className="flex flex-wrap justify-between  border-b last:border-0 border-black/50 gap-y-1 p-2 hover:bg-slate-50 duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-[45%] text-[10px] break-words">{data?.id}</div>
      <div className="w-[45%] text-[10px] break-words">{data?.name}</div>
      <div className="w-[45%] text-[10px] break-words">{data?.email}</div>
      <div className="w-[45%] text-[10px] break-words">{data?.phone}</div>
    </div>
  );
}

const DeliveryOptions = () => {
  const [selected, setSelected] = useState("pickup");

  return (
    <div className="flex flex-wrap justify-between xl:flex-nowrap gap-4">
      <div
        className={`w-full sm:w-[48%] p-4 border rounded-[4px] cursor-pointer  flex justify-between items-start ${
          selected === "delivery" ? "border-purple-500" : "border-gray-300"
        }`}
        onClick={() => setSelected("delivery")}
      >
        <div>
          <h3 className="font-medium">Home delivery</h3>
          <p className="text-sm font-light text-[#8b8b8b]">
            Takes 3-5 business days
          </p>
        </div>
        {selected === "delivery" && <CheckCircle className="text-green-500" />}
      </div>

      <div
        className={`w-full sm:w-[48%] p-4 border rounded-[4px] cursor-pointer flex justify-between items-start ${
          selected === "pickup" ? "border-purple-500" : "border-gray-300"
        }`}
        onClick={() => setSelected("pickup")}
      >
        <div>
          <h3 className="font-medium">In-store pickup</h3>
          <p className="text-sm font-light text-[#8b8b8b]">
            Pick from store location
          </p>
        </div>
        {selected === "pickup" && <CheckCircle className="text-green-500" />}
      </div>
    </div>
  );
};

export default NewOrder;

const defaultCustomers = [
  {
    id: "#CUS-2345A9X",
    name: "Nick Lashely",
    email: "nick.lashley@email.com",
    phone: "+1 (555) 234-1001",
  },
  {
    id: "#CUS-6781B3Z",
    name: "Sophia Bennett",
    email: "sophia.bennett@email.com",
    phone: "+44 20 7946 5678",
  },
  {
    id: "#CUS-9827M6Y",
    name: "Ethan Carter",
    email: "ethan.carter@email.com",
    phone: "+61 4 3928 4321",
  },
];
