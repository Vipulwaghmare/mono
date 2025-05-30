import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PencilLine, Users } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import {
  CreateRoomDto,
  JoinRoomDto,
  CreateRoomResponseDto,
  JoinRoomResponseDto,
} from "@vipulwaghmare/apis";
import api from "@/apis/instance";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AxiosResponse } from "axios";

export default function Landing() {
  const params = useParams();
  const navigate = useNavigate();
  const _roomId = params.id as string;
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState(_roomId || "");

  const onSuccess = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };
  const { mutate: mutateCreate } = useMutation<
    AxiosResponse<CreateRoomResponseDto, any>,
    Error,
    CreateRoomDto
  >({
    mutationFn: (body) => {
      return api.scribbleControllerCreateRoom(body);
    },
    onSuccess: (data) => onSuccess(data.data.roomId),
  });

  const { mutate: mutateJoin } = useMutation<
    AxiosResponse<JoinRoomResponseDto, any>,
    Error,
    JoinRoomDto
  >({
    mutationFn: (body) => {
      return api.scribbleControllerJoinRoom(body);
    },
    onSuccess: (data) => onSuccess(data.data.roomId),
  });

  const onCreate = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateCreate({
      username,
    });
  };

  const onJoin = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateJoin({
      roomId,
      username,
    });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Scribbl</h1>
          <p className="text-gray-500">
            Draw, guess, and have fun with friends!
          </p>
        </div>

        <Tabs defaultValue="join" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="join">Join Room</TabsTrigger>
            <TabsTrigger value="create">Create Room</TabsTrigger>
          </TabsList>

          <TabsContent value="join">
            <Card>
              <CardHeader>
                <CardTitle>Join a Room</CardTitle>
                <CardDescription>
                  Enter a room code to join an existing game
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onJoin} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      name="roomCode"
                      placeholder="Enter room code"
                      className="w-full"
                      onChange={(e) => setRoomId(e.target.value)}
                      value={roomId}
                    />
                    <Input
                      type="text"
                      name="playerName"
                      placeholder="Your nickname"
                      className="w-full"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Users className="mr-2 h-4 w-4" />
                    Join Room
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create a Room</CardTitle>
                <CardDescription>
                  Start a new game and invite friends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onCreate} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      name="playerName"
                      placeholder="Your nickname"
                      className="w-full"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <PencilLine className="mr-2 h-4 w-4" />
                    Create Room
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
