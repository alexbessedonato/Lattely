import type { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";

export type ComboboxTriggerProps = ComboboxPrimitive.Trigger.Props;

export type ComboboxClearProps = ComboboxPrimitive.Clear.Props;

export type ComboboxInputProps = ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
};

export type ComboboxContentProps = ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >;

export type ComboboxListProps = ComboboxPrimitive.List.Props;

export type ComboboxItemProps = ComboboxPrimitive.Item.Props;

export type ComboboxEmptyProps = ComboboxPrimitive.Empty.Props;
