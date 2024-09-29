import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PiggyBank, TrendingDown } from "lucide-react";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Receitas",
      icon: PiggyBank,
      path: "/dashboard/incomes",
    },
    {
      id: 3,
      name: "Despesas",
      icon: TrendingDown,
      path: "/dashboard/expenses",
    },
  ];

  const path = usePathname();
  return (
    <div className="h-screen p-5 border shadow-sm">
      <div className="flex flex-row items-center">
        <span className=" font-bold text-xl">My Money</span>
      </div>
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-4 cursor-pointer rounded-full hover:text-primary hover:bg-secondary
                ${path === menu.path && "text-primary bg-secondary"}`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton />
        Perfil
      </div>
    </div>
  );
}

export default SideNav;
