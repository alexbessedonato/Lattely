import type * as React from "react";
import type { VariantProps } from "class-variance-authority";
import type { fieldVariants } from "@/shared/ui/field";
import type { Label } from "@/shared/ui/label";

export type FieldSetProps = React.ComponentProps<"fieldset">;

export type FieldLegendProps = React.ComponentProps<"legend"> & {
  variant?: "legend" | "label";
};

export type FieldProps = React.ComponentProps<"div"> &
  VariantProps<typeof fieldVariants>;

export type FieldLabelProps = React.ComponentProps<typeof Label>;

export type FieldDescriptionProps = React.ComponentProps<"p">;
