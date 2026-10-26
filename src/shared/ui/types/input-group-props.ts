import type * as React from "react";
import type { VariantProps } from "class-variance-authority";
import type {
  inputGroupAddonVariants,
  inputGroupButtonVariants,
} from "@/shared/ui/input-group";
import type { Button } from "@/shared/ui/button";

export type InputGroupProps = React.ComponentProps<"div">;

export type InputGroupAddonProps = React.ComponentProps<"div"> &
  VariantProps<typeof inputGroupAddonVariants>;

export type InputGroupButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "size" | "type"
> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset";
  };

export type InputGroupInputProps = React.ComponentProps<"input">;
