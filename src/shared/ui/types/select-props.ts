import type * as React from "react";
import type { Select as SelectPrimitive } from "@base-ui/react/select";

export type SelectGroupProps = SelectPrimitive.Group.Props;

export type SelectValueProps = SelectPrimitive.Value.Props;

export type SelectTriggerProps = SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default";
};

export type SelectContentProps = SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >;

export type SelectItemProps = SelectPrimitive.Item.Props;

export type SelectScrollUpButtonProps = React.ComponentProps<
  typeof SelectPrimitive.ScrollUpArrow
>;

export type SelectScrollDownButtonProps = React.ComponentProps<
  typeof SelectPrimitive.ScrollDownArrow
>;
