/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { MapPin, Calendar, Settings2, ArrowRight } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DatePicker } from "../../components/date-picker";
import { DateRange } from "react-day-picker";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function DestinationAndDateHeader() {
  const { trip_id } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();

  const [isOnTripUpdateMode, setIsOnTripUpdateMode] = useState(false);
  const [destination, setDestination] = useState<string | undefined>("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  useEffect(() => {
    api.get(`trips/${trip_id}`).then((response) => setTrip(response.data.trip));
  }, [trip_id]);

  function openUpdateMode() {
    setDestination(trip?.destination);
    setEventStartAndEndDates({
      from: new Date(trip?.starts_at!),
      to: new Date(trip?.ends_at!),
    });
    setIsOnTripUpdateMode(true);
  }

  async function updateTrip() {
    if (!destination) return;

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) return;

    await api.put(`/trips/${trip?.id}`, {
      ...trip,
      destination: destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
    });

    window.document.location.reload();
  }

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedTripDate = trip
    ? format(trip.starts_at, "d' de 'LLLL' de 'R", {
        locale: ptBR,
      })
        .concat(" até ")
        .concat(
          format(trip.ends_at, "d' de 'LLLL' de 'R", {
            locale: ptBR,
          })
        )
    : null;

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLLL' de 'R", {
          locale: ptBR,
        })
          .concat(" até ")
          .concat(
            format(eventStartAndEndDates.to, "d' de 'LLLL' de 'R", {
              locale: ptBR,
            })
          )
      : null;

  return (
    <div>
      {isOnTripUpdateMode ? (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Para onde você vai?"
              className="bg-transparent placeholder-zinc-400 outline-none"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={openDatePicker}
              className="flex items-center gap-2 text-left"
            >
              <Calendar className="size-5 text-zinc-400" />
              <span className="text-zinc-400">
                {displayedDate || "Quando?"}
              </span>
            </button>

            <div className="w-px h-6 bg-zinc-800" />

            <Button onClick={updateTrip} variant="primary">
              Salvar
              <ArrowRight className="size-5" />
            </Button>
          </div>

          {isDatePickerOpen && (
            <DatePicker
              eventStartAndEndDates={eventStartAndEndDates}
              setEventStartAndEndDates={setEventStartAndEndDates}
              closeDatePicker={closeDatePicker}
            />
          )}
        </div>
      ) : (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-zinc-400" />
            <span className="text-zinc-100">{trip?.destination}</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <span className="text-zinc-100">{displayedTripDate}</span>
            </div>

            <div className="w-px h-6 bg-zinc-800" />

            <Button onClick={openUpdateMode} variant="secondary">
              Alterar local/data
              <Settings2 className="size-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
