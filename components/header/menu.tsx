"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Menus = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Scanner", link: "/dashboard/scanner" },
  { name: "Apprenants", link: "/dashboard/apprenants" },
  { name: "Admin", link: "/dashboard/admin" },
];

const Menu = () => {
  const path = usePathname();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  useEffect(() => {
    console.log(path.split("/"));
  });
  return (
    <div className="flex gap-7  text-black justify-center items-center ">
      {Menus.map((elt, index) => {
        return (
          <Link
            href={elt.link}
            key={index}
            className={
              selectedMenu == elt.name
                ? " bg-main_color text-white font-bold  p-2 rounded-md"
                : ""
            }
            onClick={() => {
              setSelectedMenu(elt.name);
            }}
          >
            {elt.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
