/* eslint-disable no-constant-condition */
import { CircleCheck, CircleDashed } from "lucide-react";

export function Activities() {
  return (
    <div className="space-y-8">
      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-zinc-300 font-semibold">Dia 17</span>
          <span className="text-xs text-zinc-500">Sabado</span>
        </div>

        <div className="space-y-2.5">
          <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
            {true ? (
              <CircleCheck className="size-5 text-lime-300" />
            ) : (
              <CircleDashed className="text-zinc-400 size-5 shrink-0" />
            )}
            <span className="text-zinc-100">atividade aoba</span>
            <span className="text-zinc-400 text-sm ml-auto">00:00h</span>
          </div>
        </div>

        <p className="text-zinc-500 text-sm">
          Nenhuma atividade cadastrada nessa data.
        </p>
      </div>
    </div>
  );
}
