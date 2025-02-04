import { type LinkProps as LinkPrimitiveProps } from "react-aria-components";
import { Link } from "./link";

export type BackButtonProps = LinkPrimitiveProps;

export function BackButton(props: BackButtonProps) {
  return (
    <Link
      {...props}
      className="flex size-11 cursor-pointer items-center justify-center rounded-full border-ui-green-100 bg-ui-green-100 p-0 text-ui-green-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 12H5m0 0 7 7m-7-7 7-7"
        />
      </svg>
    </Link>
  );
}
