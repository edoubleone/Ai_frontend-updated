import { CircleAlert } from "lucide-react";
import React from "react";

export interface SecondaryInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorText?: string;
  wrapperClass?: string;
  inputClass?: string;
  info?: boolean;
  icon?: React.ReactNode;
  iconposition?: "left" | "right";
}

const SecondaryInput = React.forwardRef<HTMLInputElement, SecondaryInputProps>(
  (props, ref) => {
    const {
      label,
      error,
      errorText,
      wrapperClass,
      inputClass,
      icon,
      info,
      iconposition = "left",
      ...restProps
    } = props;

    return (
      <div className={`grid gap-2 ${wrapperClass}`}>
        {label && (
          <label
            className="text-base inline-flex items-center gap-x-1.5 text-[#454545] font-semibold"
            htmlFor={label}
          >
            {label}{" "}
            {info && (
              <CircleAlert size={18} strokeWidth={1.25} className="text-sm" />
            )}
          </label>
        )}
        <div className={`flex items-center relative `}>
          {icon && iconposition === "left" && (
            <span className="absolute left-[16px] top-1/2 -translate-y-1/2">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`flex-1 text-sm flex placeholder:text-[#454545] focus:ring-[3px] ring-[#343CED] items-center rounded-md border w-full border-[#D0D0D0] py-4 text-[#454545] outline-none bg-white ${
              icon && iconposition === "left"
                ? "pl-[48px] pr-4"
                : icon && iconposition === "right"
                ? "pr-[48px] pl-4"
                : "px-4"
            } ${inputClass} ${error ? "ring-[3px] ring-[#DC2626]" : ""}`}
            {...restProps}
          />
          {icon && iconposition === "right" && (
            <span className="absolute right-[16px] top-1/2 -translate-y-1/2">
              {icon}
            </span>
          )}
        </div>
        {error && <p className="text-[#DC2626] text-sm">{errorText}</p>}
      </div>
    );
  }
);

SecondaryInput.displayName = "SecondaryInput";

export default SecondaryInput;
