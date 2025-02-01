"use client";

import { signIn } from "@/lib/auth";
import { Button } from "@repo/ui/button";
import { ProgressCircle } from "@repo/ui/progress-circle";
import { TextField } from "@repo/ui/text-field";
import { useAction } from "next-safe-action/hooks";

export function SignInForm() {
  const { execute, isPending } = useAction(signIn);

  return (
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
            isPending ? (
              <ProgressCircle isIndeterminate aria-label="Submitting" />
            ) : (
              "Sign in"
            )
          }
        </Button>
      </div>
    </form>
  );
}
