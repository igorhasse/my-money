import React from "react";
import Calendar from "./Calendar";
import { UserButton } from "@clerk/nextjs";

function DashboardHeader() {
  return (
    <div className="p-5 border-b flex justify-between">
      <Calendar />
      <UserButton />
    </div>
  );
}

export default DashboardHeader;
