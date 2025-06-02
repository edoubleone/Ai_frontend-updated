import React, { useMemo, useEffect } from "react";
import { debounce } from "lodash";
import SecondaryInput, { type SecondaryInputProps } from "./secondary-input";

interface SearchInputProps extends SecondaryInputProps {
  onDebouncedChange?: (value: string) => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onDebouncedChange, ...props }, ref) => {
    const debouncedOnChange = useMemo(() => {
      return debounce((value: string) => {
        if (onDebouncedChange) {
          onDebouncedChange(value);
        }
      }, 300);
    }, [onDebouncedChange]);

    useEffect(() => {
      return () => {
        debouncedOnChange.cancel();
      };
    }, [debouncedOnChange]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      debouncedOnChange(value);
    };

    return (
      <SecondaryInput
        ref={ref}
        {...props}
        iconposition="left"
        onChange={handleChange}
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 17.5L22.5 22"
              stroke="#5C5C5C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.5 11C20.5 6.02944 16.4706 2 11.5 2C6.52944 2 2.5 6.02944 2.5 11C2.5 15.9706 6.52944 20 11.5 20C16.4706 20 20.5 15.9706 20.5 11Z"
              stroke="#5C5C5C"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
    );
  }
);

export default SearchInput;
