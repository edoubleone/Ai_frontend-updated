import React from "react";

export interface SecondaryInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorText?: string;
  wrapperClass?: string;
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
      icon,
      iconposition = "left",
      ...restProps
    } = props;

    //input error and focus styles
    // ${
    //         error
    //           ? "border-[#DC2626] ring-2 p-px rounded-md ring-[#DC2626]"
    //           : "border-zinc-200 rounded-md p-px focus-within:ring-2 focus-within:ring-[#B99166]"
    //       }

    return (
      <div className={`grid gap-2 ${wrapperClass}`}>
        {label && (
          <label className="text-base text-[#454545] font-semibold" htmlFor={label}>
            {label}
          </label>
        )}
        <div className={`flex items-center relative `}>
          {icon && iconposition === "left" && (
            <span className="absolute top-4 left-3">{icon}</span>
          )}
          <input
            ref={ref}
            className="flex-1 text-sm flex placeholder:text-[#454545] focus:ring-[3px] ring-[#343CED] items-center px-4 rounded-md border border-[#D0D0D0] py-4 text-[#454545] outline-none bg-white"
            {...restProps}
          />
          {icon && iconposition === "right" && (
            <span className="absolute top-4 right-3">{icon}</span>
          )}
        </div>
        {error && <p className="text-[#DC2626] text-sm">{errorText}</p>}
      </div>
    );
  }
);

SecondaryInput.displayName = "SecondaryInput";

export default SecondaryInput;
