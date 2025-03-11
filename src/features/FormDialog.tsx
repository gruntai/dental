"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectComp from "./patient-waitlist/Select";

export function FormDialog({
  isLoggedin,
  setIsloggedIn,
  closeMainModal,
  subTitle = "",
}: {
  isLoggedin: boolean;
  setIsloggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  closeMainModal: () => void;
  subTitle?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  function handleSave() {
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    //   setOpen(false);
    // }, 2000);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-[#0052ff] hover:bg-[#0052ff]/80 disabled:bg-[#9AB3F2]  text-sm font-semibold rounded-3xl h-[50px] px-8  mb-5 sm:mb-0"
          onClick={handleSave}
          disabled={isLoading}
        >
          Next steps{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <div>
          <p className="text-[#606060] font-semibold text-lg">Sign in </p>
          <p className="text-[#A2A3A7] text-xs">Sign to {subTitle} </p>
        </div>
        <InputForm
          isLoggedin={isLoggedin}
          setIsloggedIn={setIsloggedIn}
          closeModal={() => setOpen(false)}
          closeMainModal={closeMainModal}
        />
      </DialogContent>
    </Dialog>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export function InputForm({
  isLoggedin,
  setIsloggedIn,
  closeModal,
  closeMainModal,
}: {
  closeModal: () => void;
  isLoggedin: boolean;
  setIsloggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  closeMainModal: () => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = React.useState(false);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.email && data.password) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsloggedIn(true);
        closeModal();
        closeMainModal();
        //   setOpen(false);
      }, 2000);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@grunt.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel>Password</FormLabel>
              <FormControl className="w-full ">
                <Input className="w-full" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full"></div>
        <Button
          type="submit"
          className="w-full bg-[#225cfe] hover:bg-[#225cfe]/80 disabled:bg-[#225cfe]/50 text-sm font-semibold  px-8 "
          disabled={isLoading}
        >
          Sign in
        </Button>
      </form>
    </Form>
  );
}
