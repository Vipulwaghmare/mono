"use client";

import { useEffect, useState } from "react";
import DrawingCanvas from "@/components/DrawingCanvas";
import ChatSection from "@/components/ChatSection";
import PlayersList from "@/components/PlayerList";
import GameInfo from "@/components/GameInfo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router";

type Player = {
  id: string;
  name: string;
  score: number;
  isDrawing: boolean;
};

type GameState = {
  status: "waiting" | "playing" | "round_end";
  currentWord?: string;
  timeLeft: number;
  round: number;
  totalRounds: number;
};

// Mock words for the game
const words = [
  "apple",
  "banana",
  "car",
  "dog",
  "elephant",
  "flower",
  "guitar",
  "house",
  "island",
  "jacket",
  "kite",
  "lion",
  "mountain",
  "notebook",
  "ocean",
  "pizza",
];

export default function Room() {
  const params = useParams();
  const roomId = params.id as string;

  const [players, setPlayers] = useState<Player[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    status: "waiting",
    timeLeft: 60,
    round: 0,
    totalRounds: 3,
  });
  const [isDrawing, setIsDrawing] = useState(false);
  const [messages, setMessages] = useState<
    Array<{
      id: string;
      sender: string;
      text: string;
      isCorrect?: boolean;
    }>
  >([]);
  const [playerName, setPlayerName] = useState("");
  const [drawingData, setDrawingData] = useState<any>(null);

  useEffect(() => {
    // Get player name from localStorage or prompt
    const storedName = localStorage.getItem("playerName") || "";
    const name = storedName || prompt("Enter your nickname") || "Guest";
    setPlayerName(name);
    localStorage.setItem("playerName", name);

    // Add current player to the game
    const playerId = uuidv4();
    const newPlayer: Player = {
      id: playerId,
      name,
      score: 0,
      isDrawing: false,
    };

    // For demo purposes, add some mock players
    setPlayers([
      newPlayer,
      { id: "player2", name: "Player 2", score: 0, isDrawing: true },
      { id: "player3", name: "Player 3", score: 100, isDrawing: false },
    ]);

    // Set the current player as drawing for demo
    setTimeout(() => {
      setIsDrawing(true);
      setGameState({
        ...gameState,
        status: "playing",
        currentWord: words[Math.floor(Math.random() * words.length)],
        round: 1,
      });
    }, 2000);

    // Add a welcome message
    setMessages([
      {
        id: uuidv4(),
        sender: "System",
        text: `Welcome to room ${roomId}!`,
      },
    ]);
  }, [roomId]);

  const sendMessage = (text: string) => {
    if (text.trim()) {
      const newMessage = {
        id: uuidv4(),
        sender: playerName,
        text,
      };

      // Check if the guess is correct (for demo purposes)
      if (
        gameState.currentWord &&
        text.toLowerCase() === gameState.currentWord.toLowerCase() &&
        !isDrawing
      ) {
        newMessage.isCorrect = true;

        // Update player scores
        setPlayers((prev) =>
          prev.map((player) =>
            player.name === playerName
              ? { ...player, score: player.score + 100 }
              : player,
          ),
        );

        // Add system message
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: uuidv4(),
              sender: "System",
              text: `${playerName} guessed correctly!`,
            },
          ]);
        }, 500);
      }

      setMessages((prev) => [...prev, newMessage]);
    }
  };

  const startGame = () => {
    setGameState({
      ...gameState,
      status: "playing",
      currentWord: words[Math.floor(Math.random() * words.length)],
      round: 1,
    });

    // Randomly select a drawer
    const randomIndex = Math.floor(Math.random() * players.length);
    setPlayers((prev) =>
      prev.map((player, index) => ({
        ...player,
        isDrawing: index === randomIndex,
      })),
    );

    // Add system message
    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        sender: "System",
        text: "Game started!",
      },
    ]);
  };

  const handleDrawingData = (data: any) => {
    // In a real app, this would be sent to other players via WebSockets
    setDrawingData(data);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">
            Scribbl Room: {roomId}
          </h1>
          <GameInfo
            status={gameState.status}
            round={gameState.round}
            totalRounds={gameState.totalRounds}
            timeLeft={gameState.timeLeft}
          />
        </div>
      </div>

      <div className="container mx-auto flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 overflow-hidden">
        <div className="md:col-span-2 flex flex-col space-y-4">
          <Card className="flex-1 p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isDrawing
                  ? `You're drawing: ${gameState.currentWord}`
                  : gameState.status === "playing"
                    ? "Guess the word!"
                    : "Waiting for the game to start..."}
              </h2>
              {gameState.status === "waiting" && players.length >= 2 && (
                <Button onClick={startGame}>Start Game</Button>
              )}
            </div>
            <div className="flex-1 bg-white border rounded-md overflow-hidden">
              <DrawingCanvas
                isDrawing={isDrawing}
                onDrawingData={handleDrawingData}
                receivedData={drawingData}
              />
            </div>
          </Card>
        </div>

        <div className="flex flex-col space-y-4">
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Players</h2>
            <PlayersList players={players} />
          </Card>

          <Card className="flex-1 p-4 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Chat</h2>
            <ChatSection
              messages={messages}
              onSendMessage={sendMessage}
              disabled={isDrawing}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
