import { Crown, Pencil } from "lucide-react";

interface PlayersListProps {
  players: Array<{
    id: string;
    name: string;
    score: number;
    isDrawing: boolean;
  }>;
}

export default function PlayersList({ players }: PlayersListProps) {
  // Sort players by score (highest first)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-2">
      {sortedPlayers.length === 0 ? (
        <div className="text-center text-gray-400 py-4">No players yet</div>
      ) : (
        sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className="flex items-center justify-between p-2 rounded-md bg-white border"
          >
            <div className="flex items-center gap-2">
              {index === 0 && <Crown className="h-4 w-4 text-yellow-500" />}
              <span className="font-medium">{player.name}</span>
              {player.isDrawing && <Pencil className="h-4 w-4 text-blue-500" />}
            </div>
            <div className="font-semibold">{player.score}</div>
          </div>
        ))
      )}
    </div>
  );
}
