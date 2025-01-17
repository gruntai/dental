"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRef, useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = (e: SubmitEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim(); // Trim whitespace
    const password = passRef.current?.value.trim();

    const validEmail = "demo@getgrunt.co";
    const validPassword = "Demo123";

    if (email == validEmail && password == validPassword) {
      localStorage.setItem("authenticated", "true"); // Store authentication flag
      router.push("/wizard"); // Redirect to /wizard
    } else {
      setErrorMessage("Invalid email or password."); // Show error message
    }
  };

  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={(e) => {
        handleLogin(e);
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
            Email Address
          </Label>
          <Input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
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
          <Input
            id="password"
            name="password"
            type="password"
            required
            ref={passRef}
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-xs">{errorMessage}</p> // Error message displayed
        )}
        <Button type="submit" className="w-full rounded-3xl h-12">
          Sign in
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
