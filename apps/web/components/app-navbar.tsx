"use client";

import { Button, ButtonPrimitive } from "@repo/ui/button";
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
};

export function AppNavbar({ items }: AppNavbarProps) {
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
          <Button>Sign In</Button>
        </div>

        <div className="md:hidden">
          {/* <div className="px-4">
            {[
              { name: "Home", href: "/posts" },
              { name: "Our Blog", href: "/me" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-3 py-2 font-extrabold text-ui-green-100"
              >
                {item.name}
              </Link>
            ))}
          </div> */}

          {/* <div className="mt-8 ml-6 py-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="15"
              viewBox="0 0 19 15"
              fill="none"
              // className="h-3 w-4"
            >
              <path
                d="M1.10645 7.48804L17.1064 7.48804M17.1064 7.48804L11.1064 1.48804M17.1064 7.48804L11.1064 13.488"
                stroke="#D8E9E4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div> */}
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
          <NavbarTrigger className="-ml-1" />
        </div>
      </NavbarCompact>
    </Navbar>
  );
}

function CloseButton() {
  // const isMobile = useMediaQuery("(max-width: 600px)");
  // const buttonRef = useRef<HTMLButtonElement>(null);

  // useEffect(() => {
  //   if (isMobile && buttonRef.current) {
  //     buttonRef.current.focus();
  //   }
  // }, [isMobile]);
  return (
    <ButtonPrimitive
      // ref={buttonRef}
      // {...(isMobile ? { autoFocus: true } : {})}
      aria-label="Close"
      slot="close"
      // className={closeIndicator({ className })}\
    >
      <div className="mt-8 -ml-2">
        <svg
          width="83"
          height="25"
          viewBox="0 0 83 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
    </ButtonPrimitive>
  );
}
