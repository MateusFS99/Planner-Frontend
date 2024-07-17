import { X } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";

interface DatePickerProps {
  eventStartAndEndDates: DateRange | undefined;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  closeDatePicker: () => void;
}

export function DatePicker({
  eventStartAndEndDates,
  setEventStartAndEndDates,
  closeDatePicker,
}: DatePickerProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Selecione a data</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={closeDatePicker} />
            </button>
          </div>
        </div>

        <DayPicker
          mode="range"
          selected={eventStartAndEndDates}
          onSelect={setEventStartAndEndDates}
        />
      </div>
    </div>
  );
}
