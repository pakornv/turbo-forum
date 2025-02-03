"use client";

import type {
  ListBoxProps,
  SelectProps as SelectPrimitiveProps,
  ValidationResult,
} from "react-aria-components";
import {
  composeRenderProps,
  Select as SelectPrimitive,
  SelectValue,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import type { Placement } from "@react-types/overlays";
import { Button } from "./button";
import {
  DropdownItem,
  DropdownItemDetails,
  DropdownLabel,
  DropdownSection,
  DropdownSeparator,
} from "./dropdown";
import { Description, FieldError, Label } from "./field";
import { ListBoxPicker } from "./list-box";
import { PopoverPicker } from "./popover";
import { composeTailwindRenderProps, focusStyles } from "./primitive";

const selectTriggerStyles = tv({
  extend: focusStyles,
  base: ["cursor-default data-hovered:bg-white data-pressed:bg-white"],
  // base: [
  //   "btr flex h-10 w-full cursor-default items-center gap-4 gap-x-2 rounded-lg border border-input py-2 pr-2 pl-3 text-start shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition group-data-disabled:opacity-50 **:data-[slot=icon]:size-4 dark:shadow-none",
  //   "group-data-open:border-ring/70 group-data-open:ring-4 group-data-open:ring-ring/20",
  //   "text-fg group-data-invalid:border-danger group-data-invalid:ring-danger/20 forced-colors:group-data-invalid:border-[Mark]",
  // ],
  variants: {
    isDisabled: {
      true: "opacity-50 forced-colors:border-[GrayText] forced-colors:text-[GrayText]",
    },
  },
});

type SelectProps<T extends object> = SelectPrimitiveProps<T> & {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  className?: string;
};

const Select = <T extends object>({
  label,
  description,
  errorMessage,
  children,
  className,
  ...props
}: SelectProps<T>) => {
  return (
    <SelectPrimitive
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group flex w-full flex-col gap-y-1.5",
      )}
    >
      {label && <Label>{label}</Label>}
      {children as React.ReactNode}
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </SelectPrimitive>
  );
};

type ListProps<T extends object> = ListBoxProps<T> & {
  items?: Iterable<T>;
  placement?: Placement;
  children: React.ReactNode | ((item: T) => React.ReactNode);
  className?: string;
};

const List = <T extends object>({
  className,
  children,
  items,
  placement,
  ...props
}: ListProps<T>) => {
  return (
    <PopoverPicker className={className} placement={placement}>
      <ListBoxPicker aria-label="items" items={items} {...props}>
        {children}
      </ListBoxPicker>
    </PopoverPicker>
  );
};

type SelectTriggerProps = React.ComponentProps<typeof Button> & {
  prefix?: React.ReactNode;
  className?: string;
};

const SelectTrigger = ({ className, ...props }: SelectTriggerProps) => {
  return (
    <Button
      variant="outline"
      className={composeRenderProps(className, (className, renderProps) =>
        selectTriggerStyles({
          ...renderProps,
          className,
        }),
      )}
    >
      {props.prefix && <span className="-mr-1">{props.prefix}</span>}
      <SelectValue className="grid grid-cols-[auto_1fr] items-center text-left text-base data-placeholder:font-semibold data-placeholder:text-primary *:data-[slot=avatar]:*:-mx-0.5 *:data-[slot=avatar]:-mx-0.5 *:data-[slot=avatar]:*:mr-2 *:data-[slot=avatar]:mr-2 *:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:mr-2 sm:text-sm [&_[slot=description]]:hidden" />
      <svg
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        className="size-5 shrink-0 duration-200 group-data-disabled:opacity-50 group-data-open:rotate-180 group-data-open:text-primary forced-colors:text-[ButtonText] forced-colors:group-data-disabled:text-[GrayText]"
      >
        <path
          d="M5.56738 8.11865L10.5674 13.1187L15.5674 8.11865"
          stroke="currentColor"
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
};

export {
  Select,
  DropdownLabel as SelectLabel,
  List as SelectList,
  DropdownItem as SelectOption,
  DropdownItemDetails as SelectOptionDetails,
  DropdownSection as SelectSection,
  DropdownSeparator as SelectSeparator,
  SelectTrigger as SelectTrigger,
};
export type { SelectProps, SelectTriggerProps };
