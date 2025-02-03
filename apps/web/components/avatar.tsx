import Image from "next/image";
import { useEffect, useState } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const avatar = tv({
  base: [
    "inline-grid shrink-0 align-middle [--avatar-radius:20%] [--ring-opacity:20%] *:col-start-1 *:row-start-1",
    "outline-1 -outline-offset-1 outline-fg/(--ring-opacity)",
  ],
  variants: {
    shape: {
      square: "rounded-(--avatar-radius) *:rounded-(--avatar-radius)",
      circle: "rounded-full *:rounded-full",
    },
    size: {
      "extra-small": "size-5 *:size-5",
      small: "size-6 *:size-6",
      medium: "size-8 *:size-8",
      large: "size-10 *:size-10",
      "extra-large": "size-12 *:size-12",
    },
  },
});

type AvatarProps = VariantProps<typeof avatar> & {
  src?: string | null;
  initials?: string;
  alt?: string;
  className?: string;
  fallback?: string;
};

const Avatar = ({
  src = null,
  shape = "circle",
  size = "medium",
  initials,
  alt = "",
  className,
  fallback = "/avatar-placeholder.svg",
  ...props
}: AvatarProps & React.ComponentPropsWithoutRef<"span">) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <span
      data-slot="avatar"
      {...props}
      className={avatar({ shape, size, className })}
    >
      {initials && (
        <svg
          className="size-full fill-current p-[5%] text-[48px] font-medium uppercase select-none"
          viewBox="0 0 100 100"
          aria-hidden={alt ? undefined : "true"}
        >
          {alt && <title>{alt}</title>}
          <text
            x="50%"
            y="50%"
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            dy=".125em"
          >
            {initials}
          </text>
        </svg>
      )}

      {src !== null && (
        <Image
          width={100}
          height={100}
          src={error ? fallback : src || fallback}
          alt={alt}
          onError={() => setError(true)}
        />
      )}
    </span>
  );
};

export { Avatar };
export type { AvatarProps };
