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
import clsx from "clsx";
import { CircleAlert } from "lucide-react";

export type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options?: Option[];
  label?: string;
  placeholder?: string;
  value?: string;
  info?: boolean;
  emptyOptions?: string;
  optional?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  error?: boolean;
  extraClass?: string;
  name?: string;
  errorText?: string;
  wrapperclass?: string;
  item_disabled?: boolean;
};

export const SelectInput = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      label,
      placeholder,
      errorText,
      value,
      disabled,
      onChange,
      error,
      info,
      item_disabled,
      extraClass,
      name,
      optional = false,
      emptyOptions = "No options available",
      wrapperclass,
    },
    ref
  ) => {
    return (
      <div
        className={clsx("grid w-full items-center gap-2", `${wrapperclass}`)}
      >
        {name && <input type="hidden" name={name} value={value} />}
        <div className="flex items-center justify-between">
          <Label
            className="text-base inline-flex items-center gap-1.5 text-[#454545] font-semibold"
            htmlFor={label}
          >
            {label}{" "}
            {info && (
              <CircleAlert size={18} strokeWidth={1.25} className="text-sm" />
            )}
          </Label>

          {optional && (
            <Label
              className="text-base text-[#454545] font-semibold"
              htmlFor={label}
            >
              Optional
            </Label>
          )}
        </div>
        <Select disabled={disabled} value={value} onValueChange={onChange}>
          <SelectTrigger
            ref={ref}
            className={`disabled:bg-[#F0F2F5] disabled:opacity-50 ${
              error ? "ring-3 ring-[#DC2626]" : ""
            } ${extraClass}`}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="!max-w-full">
            {options?.length === 0 ? (
              <div className="text-xs min-w-[8rem] max-w-[300px] p-1 text-placeholder text-center py-2">
                {emptyOptions}
              </div>
            ) : (
              options?.map((option, index) =>
                option?.value ? (
                  <SelectGroup key={index} className="">
                    <SelectItem disabled={item_disabled} value={option?.value}>
                      {option?.label}
                    </SelectItem>
                  </SelectGroup>
                ) : null
              )
            )}
          </SelectContent>
        </Select>
        {error && <p className="text-[#DC2626] text-sm">{errorText}</p>}
      </div>
    );
  }
);
