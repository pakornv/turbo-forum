"use client";

import { createContext, use, useCallback, useMemo, useState } from "react";

import { type VariantProps, tv } from "tailwind-variants";

import { Button, type ButtonProps } from "./button";
import { Sheet, SheetBody, SheetContent } from "./sheet";
import { useMediaQuery } from "./utils/use-media-query";

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M11 20H29M11 14H29M11 26H29"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type NavbarOptions = {
  side?: "left" | "right";
  isSticky?: boolean;
  intent?: "navbar" | "floating" | "inset";
};

type NavbarContextProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  isCompact: boolean;
  toggleNavbar: () => void;
} & NavbarOptions;

const NavbarContext = createContext<NavbarContextProps | null>(null);

function useNavbar() {
  const context = use(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a Navbar.");
  }

  return context;
}

type NavbarProps = React.ComponentProps<"header"> &
  NavbarOptions & {
    defaultOpen?: boolean;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  };

const navbarStyles = tv({
  base: "relative isolate flex w-full flex-col",
  variants: {
    isSticky: {
      true: "sticky top-0 z-40",
    },
    intent: {
      floating: "px-2.5 pt-2",
      navbar: "",
      inset: "min-h-svh bg-navbar dark:bg-bg",
    },
  },
});

const Navbar = ({
  children,
  isOpen: openProp,
  onOpenChange: setOpenProp,
  defaultOpen = false,
  className,
  side = "left",
  isSticky = false,
  intent = "navbar",
  ...props
}: NavbarProps) => {
  const isCompact = useMediaQuery("(max-width: 768px)");
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      if (setOpenProp) {
        return setOpenProp?.(typeof value === "function" ? value(open) : value);
      }

      _setOpen(value);
    },
    [setOpenProp, open],
  );

  const toggleNavbar = useCallback(() => {
    setOpen((open) => !open);
  }, [setOpen]);

  const contextValue = useMemo<NavbarContextProps>(
    () => ({
      open,
      setOpen,
      isCompact,
      toggleNavbar,
      intent,
      isSticky,
      side,
    }),
    [open, setOpen, isCompact, toggleNavbar, intent, isSticky, side],
  );
  return (
    <NavbarContext value={contextValue}>
      <header
        data-navbar-intent={intent}
        className={navbarStyles({ intent, isSticky, className })}
        {...props}
      >
        {children}
      </header>
    </NavbarContext>
  );
};

const navStyles = tv({
  base: [
    "group peer hidden h-(--navbar-height) w-full items-center px-4 [--navbar-height:3.75rem] md:flex",
    "[&>div]:mx-auto [&>div]:w-full [&>div]:max-w-[1680px] [&>div]:items-center md:[&>div]:flex",
  ],
  variants: {
    intent: {
      floating:
        "mx-auto w-full max-w-7xl rounded-xl border bg-navbar text-navbar-fg md:px-4 2xl:max-w-(--breakpoint-2xl)",
      navbar: "border-b bg-navbar text-navbar-fg md:px-8",
      inset: [
        "mx-auto md:px-6",
        "[&>div]:mx-auto [&>div]:w-full [&>div]:items-center md:[&>div]:flex 2xl:[&>div]:max-w-(--breakpoint-2xl)",
      ],
    },
  },
});

type NavbarNavProps = React.ComponentProps<"div"> & {
  intent?: "navbar" | "floating" | "inset";
  side?: "left" | "right";
  useDefaultResponsive?: boolean;
};

const NavbarNav = ({
  useDefaultResponsive = true,
  className,
  ref,
  ...props
}: NavbarNavProps) => {
  const { isCompact, side, intent, open, setOpen } = useNavbar();

  if (isCompact && useDefaultResponsive) {
    return (
      <Sheet isOpen={open} onOpenChange={setOpen} {...props}>
        <SheetContent
          side={side}
          aria-label="Compact Navbar"
          data-navbar="compact"
          closeButton={false}
          classNames={{
            content: "text-fg [&>button]:hidden border-ui-green-500",
          }}
          isFloat={intent === "floating"}
        >
          <SheetBody className="bg-ui-green-500 px-2 py-0 md:px-4">
            {props.children}
          </SheetBody>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      data-navbar-nav="true"
      ref={ref}
      className={navStyles({ intent, className })}
      {...props}
    >
      <div>{props.children}</div>
    </div>
  );
};

type NavbarTriggerProps = ButtonProps & {
  ref?: React.RefObject<HTMLButtonElement>;
};

const NavbarTrigger = ({
  className,
  onPress,
  ref,
  ...props
}: NavbarTriggerProps) => {
  const { toggleNavbar } = useNavbar();
  return (
    <Button
      ref={ref}
      variant="plain"
      size="square-petite"
      className={className}
      data-navbar-trigger="true"
      aria-label={props["aria-label"] || "Toggle Navbar"}
      onPress={(event) => {
        onPress?.(event);
        toggleNavbar();
      }}
      {...props}
    >
      <MenuIcon />
      <span className="sr-only">Toggle Navbar</span>
    </Button>
  );
};

const compactStyles = tv({
  base: "flex justify-between bg-navbar text-navbar-fg peer-has-[[data-navbar-intent=floating]]:border md:hidden",
  variants: {
    intent: {
      floating: "h-12 rounded-lg border px-3.5",
      inset: "h-14 border-b px-4",
      navbar: "h-18 border-b px-4",
    },
  },
});

type NavbarCompactProps = React.ComponentProps<"div"> &
  VariantProps<typeof compactStyles> & {
    ref?: React.RefObject<HTMLDivElement>;
  };

const NavbarCompact = ({ className, ref, ...props }: NavbarCompactProps) => {
  const { intent } = useNavbar();
  return (
    <div
      ref={ref}
      className={compactStyles({ intent, className })}
      {...props}
    />
  );
};

export { Navbar, NavbarCompact, NavbarNav, NavbarTrigger };
export type {
  NavbarCompactProps,
  NavbarNavProps,
  NavbarProps,
  NavbarTriggerProps,
};
