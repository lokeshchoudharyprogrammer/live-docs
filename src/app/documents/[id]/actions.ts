
"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

import { ConvexClient } from "convex/browser";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

const convex=new ConvexClient (process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function getDocuments(ids:Id<"documents">[]){
  return await convex.query(api.documents.getByIds,{ids})

}

export async function getUsers() {

  const { sessionClaims } = await auth();

const clerk=await clerkClient();
  // Fetching users list based on organization ID
  const response = await clerk.users.getUserList({
    organizationId: [sessionClaims?.org_id as string]
  });

  // Mapping user data
  const users = response.data.map((user) => ({
    id: user.id,
    name: user.fullName ??  user.primaryEmailAddress?.emailAddress ??  "Anonymous",
    avatar: user.imageUrl,
  }));

  console.log(users)

  return users;
}
