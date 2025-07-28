import * as React from "react";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import type { DateRange } from "react-day-picker";

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: DateRange | null;
  onDateChange?: (date: DateRange | undefined) => void;
  initialDate?: Date;
  initialTo?: Date;
  initialFrom?: Date;
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

export function DateRangePicker({
  date: controlledDate,
  onDateChange,
  placeholder,
  buttonClassName,
  className,
  optional = false,
  label,
  error,
  errorText,
  dateFormat = "dd-MM-yy",
  disabled,
  startDate,
  initialTo,
  initialFrom,
  ...props
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(
    controlledDate ?? { from: initialFrom, to: initialTo }
  );
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setDate(controlledDate ?? { from: initialFrom, to: initialTo });
  }, [controlledDate]);

  const handleDateChange = (selectedDate: DateRange | undefined) => {
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
              "flex items-center disabled:bg-[#F0F2F5] truncate focus:ring-[3px] ring-[#343CED] rounded-lg border w-full border-[#D0D0D0] py-4 text-[#454545] outline-none bg-white text-sm p-4 text-left font-normal",
              buttonClassName,
              error ? "ring-[3px] ring-[#DC2626]" : "",
              !date && "placeholder:text-[#454545]"
            )}
          >
            <img src="/icon/calendar.svg" className="w-4 h-4 mr-2 text-dark" />
            <p className="truncate text-sm text-deep-grey leading-default font-medium">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, dateFormat)} - {format(date.to, dateFormat)}
                  </>
                ) : (
                  <>
                    {format(date.from, dateFormat)} -
                  </>
                )
              ) : (
                <span>{placeholder}</span>
              )}
            </p>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto !z-9999 p-0">
          <Calendar
            mode="range"
            captionLayout="dropdown"
            selected={date}
            onSelect={handleDateChange}
            disabled={startDate ? (date: Date) => date < startDate : disabled}
            className="rounded-lg border shadow-sm"
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-[#DC2626] text-sm">{errorText}</p>}
    </div>
  );
}