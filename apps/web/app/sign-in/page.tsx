import { auth } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { SignInForm } from "./form";

export default async function Page() {
  const session = await auth();

  if (session?.user) redirect("/posts");

  return (
    <div className="flex min-h-full flex-1 flex-col bg-ui-green-500 lg:flex-row-reverse">
      <div className="flex max-h-[362px] max-w-full flex-1 flex-col items-center justify-center rounded-b-[36px] bg-ui-green-300 lg:max-h-full lg:max-w-[632px] lg:rounded-tl-[36px] lg:rounded-br-none">
        <Image
          width={0}
          height={0}
          src="/notebook.png"
          className="h-auto w-[170px] lg:w-[300px]"
          sizes="50vw"
          alt="Notebook"
          priority
        />
        <p className="mt-7 font-castoro text-2xl text-white italic lg:mt-10 lg:text-[28px]">
          a Board
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-center px-4">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h2 className="mt-8 text-[28px]/[34px] font-semibold text-white">
            Sign in
          </h2>
          <div className="mt-10">
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
}
