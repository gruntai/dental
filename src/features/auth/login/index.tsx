"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/dashboard");
      }}
    >
      <div className="flex gap-2 text-center mb-2">
        <p className="text-balance text-3xl text-black/90 flex items-center gap-3">
          <Image
            src="/assets/images/hand.png"
            width={30}
            height={30}
            alt="hand image"
          />
          Sign in
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email" className="font-semibold">
            Email Adress
          </Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2 mb-7">
          <div className="flex w-full items-center justify-between">
            <Label htmlFor="password" className="font-semibold">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="ml-auto text-xs underline-offset-4 underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full rounded-3xl h-12" asChild>
          <Link href="/wizard">Sign in</Link>
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline underline-offset-4">
          Create an account
        </Link>
      </div>
    </form>
  );
}
