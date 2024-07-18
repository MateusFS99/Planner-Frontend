import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { DatePicker } from "../../../components/date-picker";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  eventStartAndEndDates: DateRange | undefined;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "dd'/'LL'/'y")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "dd'/'LL'/'y"))
      : null;

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex items-center gap-5">
        <button
          disabled={isGuestsInputOpen}
          onClick={openDatePicker}
          className="flex items-center gap-2 text-left"
        >
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-lg text-zinc-400">
            {displayedDate || "Quando?"}
          </span>
        </button>

        <div className="w-px h-6 bg-zinc-800" />

        {isGuestsInputOpen ? (
          <Button onClick={closeGuestsInput} variant="secondary">
            Alterar local/data
            <Settings2 className="size-5" />
          </Button>
        ) : (
          <Button onClick={openGuestsInput} variant="primary">
            Continuar
            <ArrowRight className="size-5" />
          </Button>
        )}
      </div>

      {isDatePickerOpen && (
        <DatePicker
          eventStartAndEndDates={eventStartAndEndDates}
          setEventStartAndEndDates={setEventStartAndEndDates}
          closeDatePicker={closeDatePicker}
        />
      )}
    </div>
  );
}
