"use client";

import { Button } from "@repo/ui/button";
import { ProgressCircle } from "@repo/ui/progress-circle";
import { TextField } from "@repo/ui/text-field";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { signInAction } from "./actions";

export default function Page() {
  const { execute, isPending } = useAction(signInAction);

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
            <form
              action={async (formData: FormData) => {
                execute({ username: formData.get("username") as string });
              }}
            >
              <TextField
                name="username"
                placeholder="Username"
                aria-label="Username"
                className="text-white"
                isRequired
              />
              <div className="mt-5">
                <Button type="submit" className="w-full" isPending={isPending}>
                  {({ isPending }) =>
                    isPending ? <ProgressCircle isIndeterminate /> : "Sign In"
                  }
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
