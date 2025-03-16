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
      // @ts-expect-error
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
        <ClientSideSuspense fallback={
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-100">
            <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-[6px] border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-[6px] border-t-blue-500 border-r-purple-500 animate-spin-slow shadow-xl shadow-blue-100"></div>
            <div className="absolute inset-4 rounded-full bg-white backdrop-blur-md bg-opacity-90 shadow-inner flex items-center justify-center">
            <img src="/logo.svg" alt="App Logo" className="w-10 h-10 object-contain" />
            </div>
            </div>
            <p className="mt-8 text-2xl font-semibold text-gray-800 tracking-tight">Loading...</p>          
            <div className="mt-6 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-progress"></div>
            </div>
          </div>
        }>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}