import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";

// Initialize Convex client using environment variable
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblock=new Liveblocks({
    secret:process.env.LIVEBLOCKS_SECRET_KEY!
})
// Handle POST request
export async function POST(req: Request) {
  // Get session claims from Clerk authentication
  const { sessionClaims } = await auth();

  // If no session (user not authenticated), return 401 Unauthorized
  if (!sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Get current user details
  const user = await currentUser();

  if(!user){
    return new Response("Unauthorized", { status: 401 });
  }


  const {room}=await req.json();

  const doc=await convex.query(api.documents.getById,{id:room});

  if(!doc){
    return new Response("Unauthorized", { status: 401 });
  }

  const isOwer=doc.ownerId==user.id;

  const isOrgMember=
  !!(doc.organizationId && doc.organizationId== sessionClaims.org_id);
  
  if(!isOwer && !isOrgMember){
    return new Response("Unauthorized", { status: 401 });
  }


  const session=liveblock.prepareSession(user.id,{
    userInfo:{
        name:user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
        avatar:user.imageUrl
    }
  });

  session.allow(room,session.FULL_ACCESS);
  const {body,status}=await session.authorize();

  return new Response(body,{status})

}
