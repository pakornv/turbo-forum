"use client";

import { useState } from "react";

import type { TextInputDOMProps } from "@react-types/shared";
import { IconEye, IconEyeClosed } from "justd-icons";
import {
  Button as ButtonPrimitive,
  TextField as TextFieldPrimitive,
  type TextFieldProps as TextFieldPrimitiveProps,
} from "react-aria-components";
import { twJoin } from "tailwind-merge";

import type { FieldProps } from "./field";
import { Description, FieldError, FieldGroup, Input, Label } from "./field";
import { Loader } from "./loader";
import { composeTailwindRenderProps } from "./primitive";

type InputType = Exclude<TextInputDOMProps["type"], "password">;

type BaseTextFieldProps = TextFieldPrimitiveProps &
  FieldProps & {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    isPending?: boolean;
    className?: string;
  };

type RevealableTextFieldProps = BaseTextFieldProps & {
  isRevealable: true;
  type: "password";
};

type NonRevealableTextFieldProps = BaseTextFieldProps & {
  isRevealable?: never;
  type?: InputType;
};

type TextFieldProps = RevealableTextFieldProps | NonRevealableTextFieldProps;

const TextField = ({
  placeholder,
  label,
  description,
  errorMessage,
  prefix,
  suffix,
  isPending,
  className,
  isRevealable,
  type,
  ...props
}: TextFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = isRevealable
    ? isPasswordVisible
      ? "text"
      : "password"
    : type;
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <TextFieldPrimitive
      type={inputType}
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group flex flex-col gap-y-1.5",
      )}
    >
      {!props.children ? (
        <>
          {label && <Label>{label}</Label>}
          <FieldGroup
            isInvalid={!!errorMessage}
            isDisabled={props.isDisabled}
            className={twJoin(
              "**:[button]:h-8 **:[button]:rounded-[calc(var(--radius-lg)*0.5)] **:[button]:px-3.5 **:[button]:inset-ring-0 **:[button]:inset-shadow-none **:[button]:has-data-[slot=icon]:w-8 **:[button]:has-data-[slot=icon]:p-0 dark:**:[button]:inset-ring-0",
              "[&>[data-slot=suffix]>button]:mr-[calc(var(--spacing)*-1.7)] [&>[data-slot=suffix]>button]:data-focus-visible:outline-1 [&>[data-slot=suffix]>button]:data-focus-visible:outline-offset-1",
              "[&>[data-slot=prefix]>button]:ml-[calc(var(--spacing)*-1.7)] [&>[data-slot=prefix]>button]:data-focus-visible:outline-1 [&>[data-slot=prefix]>button]:data-focus-visible:outline-offset-1",
            )}
            data-loading={isPending ? "true" : undefined}
          >
            {prefix ? (
              <span data-slot="prefix" className="atrs x2e2">
                {prefix}
              </span>
            ) : null}
            <Input placeholder={placeholder} />
            {isRevealable ? (
              <ButtonPrimitive
                type="button"
                aria-label="Toggle password visibility"
                onPress={handleTogglePasswordVisibility}
                className="relative mr-1 grid shrink-0 place-content-center rounded-sm border-transparent outline-hidden *:data-[slot=icon]:text-muted-fg data-focus-visible:*:data-[slot=icon]:text-primary"
              >
                {isPasswordVisible ? <IconEyeClosed /> : <IconEye />}
              </ButtonPrimitive>
            ) : isPending ? (
              <Loader variant="spin" data-slot="suffix" />
            ) : suffix ? (
              <span data-slot="suffix">{suffix}</span>
            ) : null}
          </FieldGroup>
          {description && <Description>{description}</Description>}
          <FieldError>{errorMessage}</FieldError>
        </>
      ) : (
        props.children
      )}
    </TextFieldPrimitive>
  );
};

export { TextField };
export type { TextFieldProps };
