"use client";

import {
  Collection,
  Header,
  ListBoxItem as ListBoxItemPrimitive,
  type ListBoxItemProps,
  ListBoxSection,
  type SectionProps,
  Separator,
  type SeparatorProps,
  Text,
  type TextProps,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Keyboard } from "./keyboard";
import { cn } from "./utils/classes";

const dropdownItemStyles = tv({
  base: [
    "col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] not-has-data-[slot=dropdown-item-details]:items-center has-data-[slot=dropdown-item-details]:**:data-[slot=checked-icon]:mt-[1.5px] supports-[grid-template-columns:subgrid]:grid-cols-subgrid",
    "group forced-color:text-[Highlight] relative cursor-default px-3.5 py-2.5 text-base font-medium text-fg outline-0 forced-color-adjust-none select-none sm:text-base/6 forced-colors:text-[LinkText]",
    "**:data-[slot=avatar]:mr-2 **:data-[slot=avatar]:size-6 **:data-[slot=avatar]:*:mr-2 **:data-[slot=avatar]:*:size-6 sm:**:data-[slot=avatar]:size-5 sm:**:data-[slot=avatar]:*:size-5",
    "**:data-[slot=icon]:size-5 **:data-[slot=icon]:shrink-0 **:data-[slot=icon]:text-muted-fg data-danger:**:data-[slot=icon]:text-danger/70 data-focused:data-danger:**:data-[slot=icon]:text-danger-fg",
    "*:data-[slot=icon]:mr-2 data-[slot=menu-radio]:*:data-[slot=icon]:size-3",
    "forced-colors:**:data-[slot=icon]:text-[CanvasText] forced-colors:group-data-focused:**:data-[slot=icon]:text-[Canvas]",
    "[&>[slot=label]+[data-slot=icon]]:absolute [&>[slot=label]+[data-slot=icon]]:right-0",
  ],
  variants: {
    isDisabled: {
      true: "text-muted-fg forced-colors:text-[GrayText]",
    },
    isSelected: {
      true: "**:data-[slot=avatar]:hidden **:data-[slot=avatar]:*:hidden **:data-[slot=icon]:hidden",
    },
    isFocused: {
      false: "data-danger:text-danger",
      true: [
        "**:data-[slot=icon]:text-accent-fg **:[kbd]:text-accent-fg",
        "bg-accent text-accent-fg forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
        "data-danger:bg-danger data-danger:text-danger-fg",
        "data-[slot=description]:text-accent-fg data-[slot=label]:text-accent-fg [&_.text-muted-fg]:text-accent-fg/80",
      ],
    },
  },
});

const dropdownSectionStyles = tv({
  slots: {
    section: "col-span-full grid grid-cols-[auto_1fr]",
    header:
      "col-span-full px-2.5 py-1 text-sm font-medium text-muted-fg sm:text-xs",
  },
});

const { section, header } = dropdownSectionStyles();

interface DropdownSectionProps<T> extends SectionProps<T> {
  title?: string;
}

const DropdownSection = <T extends object>({
  className,
  ...props
}: DropdownSectionProps<T>) => {
  return (
    <ListBoxSection className={section({ className })}>
      {"title" in props && <Header className={header()}>{props.title}</Header>}
      <Collection items={props.items}>{props.children}</Collection>
    </ListBoxSection>
  );
};

type DropdownItemProps = ListBoxItemProps;

const DropdownItem = ({ className, ...props }: DropdownItemProps) => {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined);
  return (
    <ListBoxItemPrimitive
      textValue={textValue}
      className={composeRenderProps(className, (className, renderProps) =>
        dropdownItemStyles({ ...renderProps, className }),
      )}
      {...props}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          {typeof children === "string" ? (
            <DropdownLabel>{children}</DropdownLabel>
          ) : (
            children
          )}
          {isSelected && (
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 justify-self-end text-secondary-fg"
              data-slot="checked-icon"
            >
              <path
                d="M17.2342 5L8.06755 14.1667L3.90088 10"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </>
      ))}
    </ListBoxItemPrimitive>
  );
};

interface DropdownItemDetailProps extends TextProps {
  label?: TextProps["children"];
  description?: TextProps["children"];
  classNames?: {
    label?: TextProps["className"];
    description?: TextProps["className"];
  };
}

const DropdownItemDetails = ({
  label,
  description,
  classNames,
  ...props
}: DropdownItemDetailProps) => {
  const { slot, children, title, ...restProps } = props;

  return (
    <div
      data-slot="dropdown-item-details"
      className="col-start-2 flex flex-col gap-y-1"
      {...restProps}
    >
      {label && (
        <Text
          slot={slot ?? "label"}
          className={cn("font-medium sm:text-sm", classNames?.label)}
          {...restProps}
        >
          {label}
        </Text>
      )}
      {description && (
        <Text
          slot={slot ?? "description"}
          className={cn("text-xs text-muted-fg", classNames?.description)}
          {...restProps}
        >
          {description}
        </Text>
      )}
      {!title && children}
    </div>
  );
};

interface MenuLabelProps extends TextProps {
  ref?: React.Ref<HTMLDivElement>;
}

const DropdownLabel = ({ ref, ...props }: MenuLabelProps) => (
  <Text slot="label" ref={ref} {...props} />
);

const DropdownSeparator = ({ className, ...props }: SeparatorProps) => (
  <Separator
    orientation="horizontal"
    className={cn("col-span-full -mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
);

const DropdownKeyboard = ({
  className,
  ...props
}: React.ComponentProps<typeof Keyboard>) => {
  return (
    <Keyboard className={cn("absolute right-2 pl-2", className)} {...props} />
  );
};

/**
 * Note: This is not exposed component, but it's used in other components to render dropdowns.
 * @internal
 */
export {
  DropdownItem,
  DropdownItemDetails,
  DropdownKeyboard,
  DropdownLabel,
  DropdownSection,
  DropdownSeparator,
  dropdownItemStyles,
  dropdownSectionStyles,
};
export type {
  DropdownItemDetailProps,
  DropdownItemProps,
  DropdownSectionProps,
};
