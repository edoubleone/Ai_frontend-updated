import React from "react";
import SecondaryInput, { type SecondaryInputProps } from "./secondary-input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const PasswordInput = React.forwardRef<HTMLInputElement, SecondaryInputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <>
        <SecondaryInput
          ref={ref}
          type={showPassword ? "text" : "password"}
          icon={
            showPassword ? (
              <button
                type="button"
                title="hide password"
                className="!p-0"
                onClick={togglePasswordVisibility}
              >
                <EyeOffIcon className="size-5 text-[#5C5C5C]" />
              </button>
            ) : (
              <button
                type="button"
                title="see password"
                className="!p-0"
                onClick={togglePasswordVisibility}
              >
                <EyeIcon className="size-5 text-[#5C5C5C]" />
              </button>
            )
          }
          iconposition="right"
          {...props}
        />
      </>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
