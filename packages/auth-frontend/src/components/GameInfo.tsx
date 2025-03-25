import { Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface GameInfoProps {
  status: "waiting" | "playing" | "round_end";
  round: number;
  totalRounds: number;
  timeLeft: number;
}

export default function GameInfo({
  status,
  round,
  totalRounds,
  timeLeft,
}: GameInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Round:</span>
        <span className="font-bold">
          {round}/{totalRounds}
        </span>
      </div>

      {status === "playing" && (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="font-bold">{timeLeft}s</span>
          <Progress value={(timeLeft / 60) * 100} className="w-24" />
        </div>
      )}

      <div className="px-2 py-1 rounded-full text-xs font-medium capitalize bg-gray-100">
        {status === "waiting"
          ? "Waiting for players"
          : status === "playing"
            ? "Game in progress"
            : "Round ended"}
      </div>
    </div>
  );
}
