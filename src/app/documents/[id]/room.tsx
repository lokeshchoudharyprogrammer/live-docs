"use client";

import { ReactNode, useState, useMemo, useEffect } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import {Id} from "../../../../convex/_generated/dataModel";

import { getUsers,getDocuments } from "./actions";
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
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = params.id as string;
        const res = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room })
        });
        return await res.json()
      }}

      resolveMentionSuggestions={({ text }) => {
        let filter = users;
        if (text) {
          filter = users!.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()))
        }
        return filter!.map((user) => user.id)
      }}
      resolveUsers={({ userIds }) => {
        return userIds.map((userId) => users!.find((user) => user.id === userId) ?? undefined)
      }}

      resolveRoomsInfo={async ({roomIds})=>{
        const docs=await getDocuments(roomIds as Id<"documents">[])
        return docs.map((doc)=>({
          id:doc.id,
          name:doc.name
        }))
      }}

    >
      <RoomProvider id={params.id as string} initialStorage={{leftMargin:56,rightMargin:56}}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}