import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";

interface SingleDatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: Date | null;
  onDateChange?: (date: Date | undefined) => void;
  initialDate?: Date;
  placeholder?: string;
  buttonClassName?: string;
  dateFormat?: string;
  label?: string;
  optional?: boolean;
  error?: boolean;
  disabled?: boolean;
  startDate?: Date;
  errorText?: string;
}

export function DatePicker({
  date: controlledDate,
  onDateChange,
  placeholder,
  buttonClassName,
  className,
  optional = false,
  label,
  error,
  errorText,
  dateFormat = "PPP",
  disabled,
  startDate,
  ...props
}: SingleDatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    controlledDate ?? undefined
  );
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setDate(controlledDate ?? undefined);
  }, [controlledDate]);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onDateChange?.(selectedDate);
    setOpen(false);
  };

  return (
    <div className={cn("grid w-full gap-2", className)} {...props}>
      <div className="flex justify-between">
        <Label className="text-base inline-flex items-center gap-x-1.5 text-[#454545] font-semibold">
          {label}
        </Label>
        {optional && <Label htmlFor={label}>Optional</Label>}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            disabled={disabled}
            className={cn(
              "flex items-center disabled:bg-[#F0F2F5] truncate focus:ring-[3px] ring-[#343CED] rounded-md border w-full border-[#D0D0D0] py-4 text-[#454545] outline-none bg-white text-sm p-4 text-left font-normal",
              buttonClassName,
              error ? "ring-[3px] ring-[#DC2626]" : "",
              !date && "placeholder:text-[#454545]"
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2 text-dark" />
            {date ? format(date, dateFormat) : placeholder}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto !z-9999 p-0">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            onSelect={handleDateChange}
            disabled={startDate ? (day: Date) => day < startDate : disabled}
            className="rounded-lg border shadow-sm"
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-[#DC2626] text-sm">{errorText}</p>}
    </div>
  );
}