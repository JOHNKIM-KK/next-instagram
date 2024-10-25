"use client";

import Link from "next/link";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import HomeFillIcon from "@/components/ui/icons/HomeFillIcon";
import SearchIcon from "@/components/ui/icons/SearchIcon";
import SearchFillIcon from "@/components/ui/icons/SearchFillIcon";
import NewIcon from "@/components/ui/icons/NewIcon";
import NewFillIcon from "@/components/ui/icons/NewFillIcon";
import { usePathname } from "next/navigation";
import ColorButton from "@/components/ui/ColorButton";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "@/components/Avatar";

const menu = [
  {
    href: "/",
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    href: "/search",
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
  },
  {
    href: "/new",
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
  },
];

const Navbar = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className={" flex justify-between items-center px-6"}>
      <Link href={"/"}>
        <h1 className={"text-3xl font-bold"}>Instagram</h1>
      </Link>
      <nav>
        <ul className={"flex gap-4 items-center p-4"}>
          {menu.map(({ href, icon, clickedIcon }) => (
            <li key={href}>
              <Link href={href}>{pathName === href ? clickedIcon : icon}</Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size={"small"} highlight={true} />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton text={"Sign out"} onClick={() => signOut()} />
            ) : (
              <ColorButton text={"Sign in"} onClick={() => signIn()} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
