"use client";

import { ReactNode, useState, useMemo, useEffect } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

import { getUsers } from "./actions";
import { toast } from "sonner";

type User = { id: string, name: string, avatar: string };


export function Room({ children }: { children: ReactNode }) {
  const params = useParams()

  const [users, setUser] = useState<User[]>()

  const fetchUsers = useMemo(() => async () => {
    try {
      const list = await getUsers();
      setUser(list)
      console.log(list)

    } catch {
      console.log("err")
      toast.error("Faild to fetch")

    }

  }, [])


  useEffect(() => {
    fetchUsers()

  }, [fetchUsers])



  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={"/api/liveblocks-auth"}

      resolveMentionSuggestions={({text}) =>{
        let filter=users;
        if(text){
          filter=users.filter((user)=>user.name.toLowerCase().includes(text.toLowerCase()))
        }
        return  filter.map((user)=>user.id)
      }}
      resolveUsers={({userIds}) => {
        return userIds.map((userId)=>users.find((usesr)=>user.id===userId)??undefined)
      }}
      resolveRoomsInfo={() => []}

    >
      <RoomProvider id={params.id as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}