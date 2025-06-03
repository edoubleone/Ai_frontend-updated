import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface InputSelectComboProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputValue?: number;
  selectValue?: string;
  label?: string;
  options: Option[];
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  selectdisabled?: boolean;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange?: (value: string) => void;
  inputClass?: string;
}

export type Option = {
  value: string;
  label: string;
};

const InputSelectCombo: React.FC<InputSelectComboProps> = ({
  label,
  options,
  inputValue,
  selectValue,
  placeholder,
  name,
  disabled,
  selectdisabled,
  onInputChange,
  onSelectChange,
  inputClass,
  ...rest
}) => {
  return (
    <div className="grid w-full items-center gap-2">
      <div className="flex justify-between">
        <Label className="text-base text-[#454545] font-semibold" htmlFor={label}>
          {label}
        </Label>
      </div>

      <div
        className={`flex pr-1.5 relative items-center justify-between w-full rounded-md border border-[#D0D0D0] focus-within:ring-[3px] focus-within:ring-[#343CED] ${inputClass}`}
      >
        <Select
          disabled={selectdisabled}
          value={selectValue || options[0]?.value}
          onValueChange={onSelectChange}
        >
          <SelectTrigger className="!border-none outline-none focus:outline-none ring-0 justify-evenly focus:ring-0 p-4  gap-1.5 left-0 top-0 w-[75px] bg-[#F5F5F5] rounded-l-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectGroup key={option?.value}>
                <SelectItem value={option?.value}>{option?.label}</SelectItem>
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
        <input
          type="number"
          name={name}
          placeholder={placeholder}
          value={inputValue}
          onChange={onInputChange}
          className={`flex-1 text-sm flex placeholder:text-[#454545] items-center py-4 text-[#454545] outline-none bg-white pl-2 border-[#D0D0D0]`}
          disabled={disabled}
          {...rest}
        />
      </div>
    </div>
  );
};

export default InputSelectCombo;
