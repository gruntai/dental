"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { FormHTMLAttributes, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

export function Signup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();

  // State for email fields and error
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if emails match
    if (email !== confirmEmail) {
      setEmailError("Emails do not match");
      return;
    }

    // Clear any previous errors and navigate to the dashboard
    setEmailError("");
    formRef.current?.submit();
    // router.push("/thank-you");
  };

  return (
    <form
      ref={formRef}
      action="https://formsubmit.co/nick@getgrunt.co"
      className={cn("flex flex-col gap-6 -mt-16", className)}
      {...props}
      onSubmit={handleSubmit}
      method="POST"
    >
      <input
        type="hidden"
        name="_next"
        value="https://grunt-nick.netlify.app/thank-you"
      />
      <input type="hidden" name="_captcha" value="false" />

      <div className="flex gap-2 text-center mb-2">
        <p className="text-balance text-2xl text-black/90 flex items-center gap-3">
          <Image
            src="/assets/images/hand.png"
            width={30}
            height={30}
            alt="hand image"
          />
          Create an account
        </p>
      </div>
      <div className="grid gap-7">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="grid gap-2 flex-1">
            <Label htmlFor="fname" className="font-semibold text-[#141417]">
              First Name
            </Label>
            <Input
              id="fname"
              name="First_Name"
              type="text"
              required
              className="border-[#EFEFEE] rounded-[4px] h-12"
            />
          </div>
          <div className="grid gap-2 flex-1">
            <Label htmlFor="lname" className="font-semibold text-[#141417]">
              Last Name{" "}
            </Label>
            <Input
              id="lname"
              name="Last_Name"
              type="text"
              required
              className="border-[#EFEFEE] rounded-[4px] h-12"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="grid gap-2 flex-1">
            <Label htmlFor="email" className="font-semibold text-[#141417]">
              Email Address
            </Label>
            <Input
              id="email"
              name="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-[#EFEFEE] rounded-[4px] h-12"
            />
            {emailError && (
              <p className="text-red-500 text-xs opacity-0">{emailError}</p>
            )}
          </div>
          <div className="grid gap-2 flex-1">
            <Label
              htmlFor="confirm-email"
              className="font-semibold text-[#141417]"
            >
              Confirm Email{" "}
            </Label>
            <Input
              id="confirm-email"
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
              className={`border-[#EFEFEE] rounded-[4px] h-12 ${
                emailError ? "border-red-500" : ""
              }`}
            />
            {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex w-full items-center justify-between">
            <Label htmlFor="phone" className="font-semibold text-[#141417]">
              Phone Number
            </Label>
          </div>
          <Input
            name="Phone"
            id="phone"
            type="text"
            required
            className="border-[#EFEFEE] rounded-[4px] h-12"
          />
        </div>

        <div className="grid gap-2">
          <div className="flex w-full items-center justify-between">
            <Label htmlFor="phone" className="font-semibold text-[#141417]">
              Country{" "}
            </Label>
          </div>
          <Select required name="Country">
            <SelectTrigger className="w-full rounded-[4px] h-12">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Countries</SelectLabel>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="saudi">Saudi Arabia</SelectItem>
                <SelectItem value="kuwait">Kuwait</SelectItem>
                <SelectItem value="qatar">Qatar</SelectItem>
                <SelectItem value="oman">Oman</SelectItem>
                <SelectItem value="uae">Unitied Arab Emirates</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>{" "}
        </div>

        <div className="grid gap-2">
          <div className="flex w-full items-center justify-between">
            <Label htmlFor="company" className="font-semibold text-[#141417]">
              Company Name{" "}
            </Label>
          </div>
          <Input
            id="company"
            name="Company"
            type="text"
            required
            className="border-[#EFEFEE] rounded-[4px] h-12"
          />
        </div>

        <Button type="submit" className="w-full rounded-3xl h-12">
          Create Account{" "}
        </Button>

        <Button
          onClick={() => router.push("/login")}
          className="w-full rounded-3xl h-12 border-black border-2 hover:bg-white"
          variant={"outline"}
        >
          Already have an account{" "}
        </Button>
      </div>
    </form>
  );
}
