"use client";

import { Link } from "@repo/ui/link";
import { cn } from "@repo/ui/utils";
import { usePathname } from "next/navigation";

type AppSidebarProps = {
  items: {
    name: string;
    href: string;
    icon: React.ElementType;
  }[];
};

function AppSidebar({ items }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="grow overflow-y-auto px-4 py-8">
      <ul className="flex flex-col gap-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "group flex gap-x-3 rounded-md px-3 py-2 font-medium text-ui-green-500 hover:font-extrabold focus-visible:outline-0",
                pathname.startsWith(item.href) && "font-extrabold",
              )}
            >
              <item.icon
                aria-hidden="true"
                className={cn(
                  "size-6 stroke-[1.5] group-data-hovered:stroke-2",
                  pathname.startsWith(item.href) && "stroke-2",
                )}
              />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { AppSidebar };
