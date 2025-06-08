import type { DayPickerProps } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { DayPicker } from "react-day-picker";
import type {
  DayPickerSingleProps,
  DayPickerMultipleProps,
  DayPickerRangeProps,
} from "react-day-picker";

export type CalendarProps = (
  | DayPickerSingleProps
  | DayPickerMultipleProps
  | DayPickerRangeProps
) & {
  className?: string;
  classNames?: Partial<DayPickerProps["classNames"]>;
};

function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center flex-col pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "relative space-x-1 w-full flex items-center justify-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        
        /** 🛠️ KEY PART */
        table: "w-full border-collapse",
        head_row: "",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "", // ✅ Let DayPicker handle the row layout (don’t use `flex`)
        cell: "text-center text-sm p-0 relative", // ✅ Removed flex-related styles

        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}

      {...props}
    />
  );
}

Calendar.displayName = "Calendar";
export { Calendar };
