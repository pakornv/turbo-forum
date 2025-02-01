"use client";

import { type VariantProps, tv } from "tailwind-variants";

const badgeStyles = tv({
  base: "inline-flex items-center gap-x-1.5 px-2 py-1 text-xs **:data-[slot=icon]:size-3 forced-colors:outline",
  variants: {
    color: {
      primary: [
        "bg-(--badge-primary) [--badge-primary-fg:color-mix(in_oklab,var(--color-primary)_60%,white_40%)] [--badge-primary:color-mix(in_oklab,var(--color-primary)_10%,white_90%)]",
        "text-primary dark:bg-primary/15 dark:text-(--badge-primary-fg) dark:group-data-hovered:bg-primary/25",
        "group-data-hovered:bg-[color-mix(in_oklab,var(--color-primary)_15%,white_85%)] dark:group-data-hovered:bg-primary/20",
      ],
      secondary: [
        "bg-secondary text-secondary-fg group-data-hovered:bg-muted dark:bg-secondary dark:group-data-hovered:bg-muted",
      ],
      success: [
        "bg-emerald-500/15 text-emerald-700 group-data-hovered:bg-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-data-hovered:bg-emerald-500/20",
      ],
      info: "bg-sky-500/15 text-sky-700 group-data-hovered:bg-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300 dark:group-data-hovered:bg-sky-500/20",
      warning:
        "bg-amber-400/20 text-amber-700 group-data-hovered:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:group-data-hovered:bg-amber-400/15",
      danger:
        "bg-red-500/15 text-red-700 group-data-hovered:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400 dark:group-data-hovered:bg-red-500/20",
    },
    shape: {
      square: "rounded-2xl",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    color: "primary",
    shape: "circle",
  },
});

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeStyles> & {
    className?: string;
    children: React.ReactNode;
  };

const Badge = ({ children, color, shape, className, ...props }: BadgeProps) => {
  return (
    <span {...props} className={badgeStyles({ color, shape, className })}>
      {children}
    </span>
  );
};

export { Badge, badgeStyles };
export type { BadgeProps };
