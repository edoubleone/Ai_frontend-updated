import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../../lib/utils";

import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  dateFormat = "PPP",
  disabled,
  startDate,
  errorText,
  ...props
}: SingleDatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    controlledDate ?? undefined
  );
  const [open, setOpen] = React.useState<boolean>(false);
  const [month, setMonth] = React.useState<number>(new Date().getMonth());
  const [year, setYear] = React.useState<number>(new Date().getFullYear());

  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: currentYear - 1900 + 101 },
      (_, i) => currentYear - i + 100
    );
  }, []);

  const months = React.useMemo(() => {
    if (year) {
      return Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
    }
    return [];
  }, [year]);

  React.useEffect(() => {
    if (date) {
      setMonth(date.getMonth());
      setYear(date.getFullYear());
    }
  }, [date]);

  React.useEffect(() => {
    setDate(controlledDate ?? undefined);
  }, [controlledDate]);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onDateChange) {
      onDateChange(selectedDate);
    }
    setOpen(false);
  };

  const handleYearChange = (selectedYear: string) => {
    const newYear = parseInt(selectedYear, 10);
    setYear(newYear);
    if (date) {
      const newDate = new Date(date);
      newDate.setFullYear(newYear);
      setDate(newDate);
    }
  };

  const handleMonthChange = (selectedMonth: string) => {
    const newMonth = parseInt(selectedMonth, 10);
    setMonth(newMonth);
    if (date) {
      const newDate = new Date(date);
      newDate.setMonth(newMonth);
      setDate(newDate);
    } else {
      setDate(new Date(year, newMonth, 1));
    }
  };

  return (
    <div className={cn("grid w-full gap-2", className)} {...props}>
      <div className="flex justify-between">
        <Label
          className="text-base inline-flex items-center gap-x-1.5 text-[#454545] font-semibold"
          htmlFor={label}
        >
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
          <div className="flex justify-between p-2 space-x-1">
            <Select onValueChange={handleYearChange} value={year.toString()}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={handleMonthChange} value={month.toString()}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {format(m, "MMMM")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Calendar
            month={new Date(year, month)}
            onMonthChange={(newMonth: Date) => {
              setMonth(newMonth.getMonth());
              setYear(newMonth.getFullYear());
            }}
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
            disabled={startDate ? (day: Date) => day < startDate : disabled}
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-[#DC2626] text-sm">{errorText}</p>}
    </div>
  );
}
