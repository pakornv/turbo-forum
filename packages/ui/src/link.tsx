"use client";

import {
  composeRenderProps,
  Link as LinkPrimitive,
  type LinkProps as LinkPrimitiveProps,
} from "react-aria-components";
import { tv, VariantProps } from "tailwind-variants";

import { focusButtonStyles } from "./primitive";

const linkStyles = tv({
  extend: focusButtonStyles,
  base: "transition-[color,_opacity] data-disabled:cursor-default data-disabled:opacity-60 forced-colors:data-disabled:text-[GrayText]",
  variants: {
    variant: {
      unstyled: "text-current",
      primary: "text-fg data-hovered:underline",
      secondary: "text-muted-fg data-hovered:text-secondary-fg",
    },
  },
  defaultVariants: {
    variant: "unstyled",
  },
});

type LinkProps = LinkPrimitiveProps &
  VariantProps<typeof linkStyles> & {
    ref?: React.RefObject<HTMLAnchorElement>;
  };

const Link = ({ className, variant, ref, ...props }: LinkProps) => {
  return (
    <LinkPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        linkStyles({ ...renderProps, variant, className }),
      )}
    >
      {(values) => (
        <>
          {typeof props.children === "function"
            ? props.children(values)
            : props.children}
        </>
      )}
    </LinkPrimitive>
  );
};

export { Link };
export type { LinkProps };
