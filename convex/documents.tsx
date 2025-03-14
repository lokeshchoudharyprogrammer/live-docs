import { ConvexError, v } from "convex/values";
import {  mutation, query } from "./_generated/server";


export const create=mutation({
    args:{title:v.optional(v.string()),initalContent:v.optional(v.string())},
    handler:async (ctx,args)=>{
        
        const user=await ctx.auth.getUserIdentity();

        if(!user){
            throw new ConvexError("Unathorized");
        }

        const docID=await ctx.db.insert("documents",{
            title:args.title?? "Untitled Coument",
            ownerId:user.subject,
            initialContent:args.initalContent
        })

        return docID;
    }

})

export const get=query({
    handler:async (ztx)=>{
        return await ztx.db.query("documents").collect();
    }
})