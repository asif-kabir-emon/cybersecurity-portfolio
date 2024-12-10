"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authKey } from "@/constants";
import { addProfiles } from "@/redux/feature/profile/profileSlicer";
import { Label } from "@radix-ui/react-label";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in", { position: "top-center" });
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      ?.value;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res?.message);
      }
      // const cookieExpiresIn = new Date(new Date().getTime() + 120 * 60 * 1000);
      dispatch(addProfiles(res.data.profiles));

      Cookies.set(authKey, res.data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "strict",
        expires: 30,
      });

      toast.success("Logged In Successfully", { id: toastId, duration: 2000 });

      router.push("/profiles");
    } catch (error: any) {
      toast.error(error?.message || "Failed to Logged In", {
        id: toastId,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="bg-slate-100 shadow-sm rounded-xl p-5 min-w-80 md:min-w-96 my-10 md:my-20">
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
          <Button
            type="submit"
            className="rounded mt-3 w-full"
            disabled={loading}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
