"use client";

import { useEffect, useRef } from "react";

import type { HeadingProps } from "react-aria-components";
import {
  Button as ButtonPrimitive,
  Dialog as DialogPrimitive,
  Heading,
  Text,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { Button, type ButtonProps } from "./button";
import { useMediaQuery } from "./utils/use-media-query";

const dialogStyles = tv({
  slots: {
    root: [
      "peer/dialog group/dialog relative flex max-h-[inherit] flex-col overflow-hidden outline-hidden [scrollbar-width:thin] [&::-webkit-scrollbar]:size-0.5",
    ],
    header:
      "relative flex flex-col gap-0.5 px-4 py-7.5 sm:gap-1 sm:p-7.5 [&[data-slot=dialog-header]:has(+[data-slot=dialog-footer])]:pb-0",
    description: "text-sm text-muted-fg",
    body: [
      "isolate flex flex-1 flex-col overflow-auto px-4 sm:px-7.5",
      "max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding)-var(--dialog-header-height,0px)-var(--dialog-footer-height,0px))]",
    ],
    footer:
      "isolate mt-auto flex flex-col-reverse justify-end gap-3 px-4 py-7.5 sm:flex-row sm:p-7.5 sm:pt-2.5",
    closeIndicator:
      "close absolute top-2 right-2 z-50 grid size-6 place-content-center rounded-xl data-focus-visible:ring-1 data-focus-visible:ring-primary data-focused:bg-secondary data-focused:outline-hidden data-hovered:bg-secondary sm:top-4 sm:right-4 sm:rounded-md",
  },
});

const { root, header, description, body, footer, closeIndicator } =
  dialogStyles();

const Dialog = ({
  role = "dialog",
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive>) => {
  return (
    <DialogPrimitive role={role} className={root({ className })} {...props} />
  );
};

const DialogTrigger = (props: React.ComponentProps<typeof ButtonPrimitive>) => (
  <ButtonPrimitive {...props} />
);

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
};

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        header.parentElement?.style.setProperty(
          "--dialog-header-height",
          `${entry.target.clientHeight}px`,
        );
      }
    });

    observer.observe(header);
    return () => observer.unobserve(header);
  }, []);

  return (
    <div
      data-slot="dialog-header"
      ref={headerRef}
      className={header({ className })}
    >
      {props.title && <DialogTitle>{props.title}</DialogTitle>}
      {props.description && (
        <DialogDescription>{props.description}</DialogDescription>
      )}
      {!props.title && typeof props.children === "string" ? (
        <DialogTitle {...props} />
      ) : (
        props.children
      )}
    </div>
  );
};

const titleStyles = tv({
  base: "flex flex-1 items-center text-fg",
  variants: {
    level: {
      1: "text-2xl font-semibold sm:text-2xl/[28px]",
      2: "text-lg font-semibold sm:text-xl",
      3: "text-base font-semibold sm:text-lg",
      4: "text-base font-semibold",
    },
  },
});

type DialogTitleProps = Omit<HeadingProps, "level"> & {
  level?: 1 | 2 | 3 | 4;
  ref?: React.Ref<HTMLHeadingElement>;
};

const DialogTitle = ({
  level = 2,
  className,
  ref,
  ...props
}: DialogTitleProps) => (
  <Heading
    slot="title"
    level={level}
    ref={ref}
    className={titleStyles({ level, className })}
    {...props}
  />
);

type DialogDescriptionProps = React.ComponentProps<"div">;

const DialogDescription = ({
  className,
  ref,
  ...props
}: DialogDescriptionProps) => (
  <Text
    slot="description"
    className={description({ className })}
    ref={ref}
    {...props}
  />
);

type DialogBodyProps = React.ComponentProps<"div">;

const DialogBody = ({ className, ref, ...props }: DialogBodyProps) => (
  <div
    data-slot="dialog-body"
    ref={ref}
    className={body({ className })}
    {...props}
  />
);

type DialogFooterProps = React.ComponentProps<"div">;

const DialogFooter = ({ className, ...props }: DialogFooterProps) => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        footer.parentElement?.style.setProperty(
          "--dialog-footer-height",
          `${entry.target.clientHeight}px`,
        );
      }
    });

    observer.observe(footer);
    return () => {
      observer.unobserve(footer);
    };
  }, []);
  return (
    <div
      ref={footerRef}
      data-slot="dialog-footer"
      className={footer({ className })}
      {...props}
    />
  );
};

const DialogClose = ({
  className,
  variant = "outline",
  ref,
  ...props
}: ButtonProps) => {
  return (
    <Button
      slot="close"
      className={className}
      ref={ref}
      variant={variant}
      {...props}
    />
  );
};

type CloseButtonIndicatorProps = ButtonProps & {
  className?: string;
  isDismissable?: boolean | undefined;
};

const DialogCloseIndicator = ({
  className,
  ...props
}: CloseButtonIndicatorProps) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isMobile && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isMobile]);
  return props.isDismissable ? (
    <ButtonPrimitive
      ref={buttonRef}
      {...(isMobile ? { autoFocus: true } : {})}
      aria-label="Close"
      slot="close"
      className={closeIndicator({ className })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        className="size-6 text-ui-green-500"
      >
        <path
          d="M17 7.52441L7 17.5244M7 7.52441L17 17.5244"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </ButtonPrimitive>
  ) : null;
};

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogCloseIndicator,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
};
export type {
  CloseButtonIndicatorProps,
  DialogBodyProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogTitleProps,
};
