export type SearchPickerProps = {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  searchable?: boolean;
  onChange: (value: string) => void;
};
