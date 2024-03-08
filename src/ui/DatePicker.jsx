import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useController } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ control, name, rules }) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
            )}
          >
            {value ? format(value, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="center">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
