"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { TbLayoutDashboard } from "react-icons/tb";
import {
  MdOutlineQrCodeScanner,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { PiStudent, PiStudentThin } from "react-icons/pi";
import { FiUserCheck } from "react-icons/fi";

const Menus = [
  { name: "Dashboard", link: "/dashboard", icon: TbLayoutDashboard },
  { name: "Scanner", link: "/dashboard/scanner", icon: MdOutlineQrCodeScanner },
  { name: "Apprenants", link: "/dashboard/apprenants", icon: PiStudent },
  { name: "Presences", link: "/dashboard/presences", icon: FiUserCheck },
  {
    name: "Admin",
    link: "/dashboard/admin",
    icon: MdOutlineAdminPanelSettings,
  },
];

const Menu = () => {
  const path = usePathname();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  return (
    <ul className="flex gap-4 flex-col w-full text-black pt-4 ">
      <PiStudentThin
        size={"100"}
        className="text-secondary_color self-center "
      />
      {Menus.map((elt, index) => {
        return (
          <Link
            href={elt.link}
            key={index}
            className={`
              ${
                selectedMenu == elt.name
                  ? " bg-main_color text-white font-bold "
                  : "hover:bg-main_color/10 "
              }   px-4 py-2  rounded-md
            `}
            onClick={() => {
              setSelectedMenu(elt.name);
            }}
          >
            <li className="flex items-center gap-3">
              {elt.icon({
                className: ` ${
                  selectedMenu == elt.name ? "" : "text-main_color"
                }`,
              })}
              <span>{elt.name}</span>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default Menu;
