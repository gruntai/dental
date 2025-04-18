"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type DemoInfoFormValues = z.infer<typeof formSchema>;

export function ConnectForm({
  setIsConnected,
  isConnected,
}: {
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  isConnected: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<DemoInfoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const { toast } = useToast();

  function onSubmit(values: DemoInfoFormValues) {
    setIsLoading(true);
    fetch("https://formsubmit.co/ajax/Nick@getgrunt.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: "I connected to the demo",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast({
          title: "Your request has been submitted",
          className: "bg-green-600 text-white",
        });
        setIsConnected(true);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Something went wrong",
          className: "bg-destructive text-white",
        });
        setIsConnected(false);
      })
      .finally(() => {
        setIsLoading(false);
        setOpen(false);
        form.reset();
      });
  }

  return (
    <div>
      {!isConnected && (
        <Button onClick={() => setOpen(true)} className="font-normal">
          Connect Now
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-left text-xl font-normal">
              🙌 Let&apos;s make this demo yours
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-[#404040] font-normal">
                        Your Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          {...field}
                          className="placeholder:font-light text-[#ADAEBC]"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] font-normal" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-[#404040] font-normal">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Phone"
                          {...field}
                          className="placeholder:font-light text-[#ADAEBC]"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] font-normal" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-[#404040] font-normal">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@company.com"
                        {...field}
                        className="placeholder:font-light text-[#ADAEBC]"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] font-normal" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full font-normal"
                disabled={isLoading}
              >
                See Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
