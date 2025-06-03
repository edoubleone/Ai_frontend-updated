import { CircleAlert } from "lucide-react";
import React from "react";

export interface SecondaryTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  errorText?: string;
  wrapperClass?: string;
  hasMax?: boolean;
  max?: number;
  textAreaClass?: string;
  info?: boolean;
}

const SecondaryTextArea = React.forwardRef<
  HTMLTextAreaElement,
  SecondaryTextAreaProps
>((props, ref) => {
  const {
    label,
    error,
    info = false,
    errorText,
    hasMax = false,
    max = 50,
    wrapperClass,
    textAreaClass,
    ...restProps
  } = props;

  return (
    <div className={`grid gap-2 ${wrapperClass}`}>
      {label && (
        <label
          className="text-base inline-flex items-center gap-1.5 text-[#454545] font-semibold"
          htmlFor={label}
        >
          {label}{" "}
          {info && (
            <CircleAlert size={18} strokeWidth={1.25} className="text-sm" />
          )}
        </label>
      )}
      <textarea
        ref={ref}
        className={`flex-1 text-sm flex placeholder:text-[#454545] focus:ring-[3px] ring-[#343CED] items-center rounded-md border w-full border-[#D0D0D0] py-4 px-4 text-[#454545] outline-none bg-white resize-y ${textAreaClass}`}
        {...restProps}
      />
      {hasMax && (
        <p className="text-[#737373] text-end text-sm">Max of {max} words</p>
      )}
      {error && <p className="text-[#DC2626] text-sm">{errorText}</p>}
    </div>
  );
});

SecondaryTextArea.displayName = "SecondaryTextArea";

export default SecondaryTextArea;
