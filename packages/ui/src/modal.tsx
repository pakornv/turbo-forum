"use client";

import type {
  DialogProps,
  DialogTriggerProps,
  ModalOverlayProps,
} from "react-aria-components";
import {
  DialogTrigger,
  ModalOverlay,
  Modal as ModalPrimitive,
  composeRenderProps,
} from "react-aria-components";
import { type VariantProps, tv } from "tailwind-variants";

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogCloseIndicator,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

const overlay = tv({
  base: [
    "fixed top-0 left-0 isolate z-50 h-(--visual-viewport-height) w-full",
    "flex items-end justify-end bg-fg/15 text-center sm:items-center sm:justify-center dark:bg-bg/40",
    "[--visual-viewport-vertical-padding:16px] sm:[--visual-viewport-vertical-padding:32px]",
  ],
  variants: {
    isBlurred: {
      true: "bg-bg supports-backdrop-filter:bg-bg/15 supports-backdrop-filter:backdrop-blur dark:supports-backdrop-filter:bg-bg/40",
    },
    isEntering: {
      true: "duration-200 ease-out animate-in fade-in",
    },
    isExiting: {
      true: "duration-150 ease-in animate-out fade-out",
    },
  },
});

const content = tv({
  base: [
    "max-h-full w-full rounded-t-2xl bg-overlay text-left align-middle text-overlay-fg ring-1 shadow-lg ring-fg/5",
    "overflow-hidden sm:rounded-2xl dark:ring-border",
  ],
  variants: {
    isEntering: {
      true: [
        "duration-200 ease-out animate-in fade-in slide-in-from-bottom",
        "sm:slide-in-from-bottom-0 sm:zoom-in-95",
      ],
    },
    isExiting: {
      true: [
        "duration-150 ease-in animate-out slide-out-to-bottom sm:slide-out-to-bottom-0 sm:zoom-out-95",
      ],
    },
    size: {
      xs: "sm:max-w-xs",
      sm: "sm:max-w-sm",
      md: "sm:max-w-md",
      lg: "sm:max-w-lg",
      xl: "sm:max-w-xl",
      "2xl": "sm:max-w-2xl",
      "3xl": "sm:max-w-3xl",
      "4xl": "sm:max-w-4xl",
      "5xl": "sm:max-w-5xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

const Modal = (props: DialogTriggerProps) => {
  return <DialogTrigger {...props} />;
};

type ModalContentProps = Omit<ModalOverlayProps, "className" | "children"> &
  VariantProps<typeof content> & {
    "aria-label"?: DialogProps["aria-label"];
    "aria-labelledby"?: DialogProps["aria-labelledby"];
    role?: DialogProps["role"];
    children?: DialogProps["children"];
    closeButton?: boolean;
    isBlurred?: boolean;
    classNames?: {
      overlay?: ModalOverlayProps["className"];
      content?: ModalOverlayProps["className"];
    };
  };

const ModalContent = ({
  classNames,
  isDismissable: isDismissableInternal,
  isBlurred = false,
  children,
  size,
  role = "dialog",
  closeButton,
  ...props
}: ModalContentProps) => {
  const isDismissable = isDismissableInternal ?? role !== "alertdialog";

  return (
    <ModalOverlay
      isDismissable={isDismissable}
      className={composeRenderProps(
        classNames?.overlay,
        (className, renderProps) => {
          return overlay({
            ...renderProps,
            isBlurred,
            className,
          });
        },
      )}
      {...props}
    >
      <ModalPrimitive
        isDismissable={isDismissable}
        className={composeRenderProps(
          classNames?.content,
          (className, renderProps) =>
            content({
              ...renderProps,
              size,
              className,
            }),
        )}
        {...props}
      >
        <Dialog role={role}>
          {(values) => (
            <>
              {typeof children === "function" ? children(values) : children}
              {(isDismissable || closeButton) && (
                <DialogCloseIndicator
                  isDismissable={isDismissable || closeButton}
                />
              )}
            </>
          )}
        </Dialog>
      </ModalPrimitive>
    </ModalOverlay>
  );
};

export {
  Modal,
  DialogBody as ModalBody,
  DialogClose as ModalClose,
  ModalContent,
  DialogDescription as ModalDescription,
  DialogFooter as ModalFooter,
  DialogHeader as ModalHeader,
  DialogTitle as ModalTitle,
};
