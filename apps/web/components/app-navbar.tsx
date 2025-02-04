"use client";

import { Avatar } from "@/components/avatar";
import { ButtonPrimitive, buttonStyles } from "@repo/ui/button";
import { Link } from "@repo/ui/link";
import {
  Navbar,
  NavbarCompact,
  NavbarNav,
  NavbarTrigger,
} from "@repo/ui/navbar";
import { cn } from "@repo/ui/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type AppNavbarProps = {
  items: {
    name: string;
    href: string;
    icon: React.ElementType;
  }[];
  user?: {
    name: string;
    image: string;
  };
};

export function AppNavbar({ user, items }: AppNavbarProps) {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <Navbar isSticky side="right" isOpen={isOpen} onOpenChange={setIsOpen}>
      <NavbarNav>
        <Link
          href="/posts"
          className="hidden font-castoro text-xl text-white italic md:flex"
        >
          a Board
        </Link>

        <div className="ml-auto hidden md:flex">
          {user ? (
            <div>
              <span className="mr-5 font-medium text-white">{user.name}</span>
              <Avatar src={user.image} alt={user.name} size="large" />
            </div>
          ) : (
            <Link href="sign-in" className={buttonStyles}>
              Sign In
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <CloseButton />

          <ul className="mt-9 flex flex-col gap-y-1 px-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex gap-x-3 rounded-md px-3 py-2 font-medium text-ui-grey-100 hover:font-extrabold hover:text-ui-green-100 focus-visible:outline-0",
                    pathname.startsWith(item.href) &&
                      "font-extrabold text-ui-green-100",
                  )}
                >
                  <item.icon
                    aria-hidden="true"
                    className={cn(
                      "size-6 stroke-[1.5] group-data-hover:stroke-2",
                      pathname.startsWith(item.href) && "stroke-2",
                    )}
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </NavbarNav>

      <NavbarCompact>
        <Link
          href="/posts"
          className="flex items-center font-castoro text-xl text-white italic"
        >
          a Board
        </Link>

        <div className="ml-auto flex items-center">
          <NavbarTrigger className="-ml-1 data-hovered:bg-ui-grey-100/10 data-pressed:bg-ui-grey-100/10" />
        </div>
      </NavbarCompact>
    </Navbar>
  );
}

function CloseButton() {
  return (
    <div className="relative mt-8 -ml-2">
      <ButtonPrimitive
        aria-label="Close"
        slot="close"
        className="absolute -top-2.25 left-5.25 size-10 rounded-lg focus-visible:outline-0 data-hovered:bg-ui-grey-100/10 data-pressed:bg-ui-grey-100/10"
      ></ButtonPrimitive>
      <svg
        width="83"
        height="25"
        viewBox="0 0 83 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6"
      >
        <path
          d="M33.1064 12.488L49.1064 12.488M49.1064 12.488L43.1064 6.48804M49.1064 12.488L43.1064 18.488"
          stroke="#D8E9E4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
