import * as React from "react";
import { CheckIcon, ChevronsUpDown, CircleAlert } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
    label?: string;
    error?: boolean;
    errorText?: string;
    wrapperClass?: string;
    inputClass?: string;
    info?: boolean;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    (
      {
        className,
        onChange,
        value,
        label,
        error,
        errorText,
        wrapperClass,
        inputClass,
        info,
        ...props
      },
      ref
    ) => {
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
          <div className="flex items-center border rounded-md border-[#D0D0D0] focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-colors overflow-hidden">
            <RPNInput.default
              ref={ref}
              className={cn(
                "flex-1 text-sm flex placeholder:text-[#454545] items-center py-4 text-[#454545] outline-none bg-transparent border-none",
                inputClass,
                error ? "ring-2 ring-red-500/20" : ""
              )}
              flagComponent={FlagComponent}
              countrySelectComponent={CountrySelect}
              inputComponent={InputComponent}
              smartCaret={false}
              value={value || undefined}
              onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
              {...props}
            />
          </div>
          {error && <p className="text-[#DC2626] text-sm">{errorText}</p>}
        </div>
      );
    }
  );
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex-1 text-sm flex placeholder:text-[#454545] items-center border-none py-0 text-[#454545] outline-none bg-transparent",
      className,
      "pl-4 pr-4"
    )}
    {...props}
  />
));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
  className?: string;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
  className,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "flex gap-2 shadow-none rounded-l-md border-r-0 border-t-0 border-b-0 h-full py-0 pl-3 pr-2 focus:z-10 hover:bg-gray-50 transition-colors h-full bg-gray-50",
            className,
            "flex items-center justify-center"
          )}
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <span className="text-xs font-medium text-gray-600">
            +{RPNInput.getCountryCallingCode(selectedCountry)}
          </span>
          <ChevronsUpDown
            className={cn(
              "size-3 text-gray-400 transition-transform",
              isOpen ? "rotate-180" : "",
              disabled ? "hidden" : ""
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="start">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    "[data-radix-scroll-area-viewport]"
                  );
                  if (viewportElement) {
                    viewportElement.scrollTop = 0;
                  }
                }
              }, 0);
            }}
            placeholder="Search country..."
            className="border-0 focus:ring-0"
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-80">
              <CommandEmpty className="py-6 text-center text-gray-500">
                No country found.
              </CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <CommandItem
      className="gap-3 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
      onSelect={handleSelect}
    >
      <FlagComponent country={country} countryName={countryName} />
      <div className="flex-1 min-w-0">
        <span className="block text-sm font-medium text-gray-900 truncate">
          {countryName}
        </span>
      </div>
      <span className="text-sm text-gray-500 font-mono">
        +{RPNInput.getCountryCallingCode(country)}
      </span>
      <CheckIcon
        className={cn(
          "ml-auto size-4 text-blue-600 transition-opacity",
          country === selectedCountry ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-5 w-7 overflow-hidden rounded-sm bg-gray-100 [&_svg:not([class*='size-'])]:size-full shadow-sm">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
