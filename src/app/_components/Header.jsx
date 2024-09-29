"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function Header() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  if (isSignedIn) {
    router.replace("/dashboard");
  }
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <div className="flex flex-row items-center">
        <span className=" font-bold text-xl">My Money</span>
      </div>
      <div className="flex gap-3 items-center">
        <Link href="/dashboard">
          <Button variant="outline" className="rounded-full">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
