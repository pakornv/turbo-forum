import { AppNavbar } from "@/components/app-navbar";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/lib/auth";
import { EditIcon, HomeIcon } from "./icons";

const items = [
  { name: "Home", href: "/posts", icon: HomeIcon },
  { name: "Our Blog", href: "/me/posts", icon: EditIcon },
];

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <>
      <AppNavbar user={session?.user} items={items} />
      <div className="flex flex-1 bg-ui-grey-100">
        <div className="hidden lg:fixed lg:flex lg:w-70 lg:flex-shrink-0 lg:flex-col">
          <AppSidebar items={items} />
        </div>
        <main className="ml-70 flex flex-1 flex-col">{children}</main>
      </div>
    </>
  );
}
