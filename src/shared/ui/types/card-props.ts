import type * as React from "react";

export type CardProps = React.ComponentProps<"div"> & {
  size?: "default" | "sm";
};

export type CardContentProps = React.ComponentProps<"div">;
