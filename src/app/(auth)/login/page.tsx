"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";

const Login = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Cast e.target to HTMLFormElement
    const form = e.target as HTMLFormElement;

    // Access the email and password values
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      ?.value;

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      console.log("Response Data:", data);

      const cookieExpiresIn = new Date(new Date().getTime() + 120 * 60 * 1000);

      Cookies.set("accessToken", data.data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "strict",
        expires: cookieExpiresIn,
      });

      router.push("/dashboard");

      alert("Login successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="bg-slate-100 shadow-sm rounded-xl p-5 min-w-80 md:min-w-96">
        <h1 className="text-2xl font-bold text-center mb-5">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2.5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter Email"
                className="rounded focus-visible:ring-neutral-50"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 ">
              <Label htmlFor="email">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="rounded focus-visible:ring-neutral-50"
              />
            </div>
          </div>
          <Button type="submit" className="rounded mt-3 w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
