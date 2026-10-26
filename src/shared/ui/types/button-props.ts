import type { VariantProps } from "class-variance-authority";
import type { Button as ButtonPrimitive } from "@base-ui/react/button";
import type { buttonVariants } from "@/shared/ui/button";

export type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants>;
