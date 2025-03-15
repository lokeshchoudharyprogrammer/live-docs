"use client";
import { Separator } from "@/components/ui/separator";
import { ClientSideSuspense } from "@liveblocks/react";

import { useOthers,useSelf } from "@liveblocks/react/suspense";


const SIZE=36;


interface Props {
    src:string;
    name:string
}

export const Avatars=()=>{
    return (
        <ClientSideSuspense fallback={null}>
            <AvatarStack/>
        </ClientSideSuspense>
    )
}

const AvatarStack=()=>{
    const users=useOthers()
    const currentUser=useSelf()

    if(users.length===0) return null

    return (
        <>
        <div className="flex items-center">
            {
                currentUser&& (
                    <div className="relative ml-2">
                        <Avatar src={currentUser.info.avatar} name="You"/>

                    </div>
                )
            }
            <div className="flex">
                {
                    users.map(({connectionId,info})=>{
                        return (
                            <Avatar key={connectionId} name={info.name} src={info.avatar} />
                        )
                    })
                }

            </div>


            
            </div>

            <Separator orientation="vertical" className="h-6"/>
            
            </>
    )


}


const Avatar=({src,name}:Props)=>{


    return (
        <div style={{width:SIZE,height:SIZE}} className="group -ml-2 felx shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400">

            <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white text-sm rounded-lg mt-2.5 z-10 bg-black whitespace-nowrap transition-opacity">
{name}
            </div>
            <img alt={name} src={src} className="size-full rounded-full"/>

        </div>
    )
}