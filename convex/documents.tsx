import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

// paginationOptsValidator


export const getByIds=query({
    args:{ids:v.array(v.id("documents"))},
    handler:async (ctx,{ids})=>{

        const docs=[];

        for(const id of ids){
            const doc=await ctx.db.get(id);

            if(doc){
                docs.push({id:doc._id,name:doc.title})
            }else{
                docs.push({id,name:"$ Removed &"})
            }
        }
        return docs;

    }
})


export const create = mutation({
    args: { title: v.optional(v.string()), initalContent: v.optional(v.string()) },
    handler: async (ctx, args) => {

        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unathorized");
        }

        const organizationId=(user.organization_id??undefined) as string| undefined;

        const docID = await ctx.db.insert("documents", {
            title: args.title ?? "Untitled Coument",
            ownerId: user.subject,
            organizationId,
            initialContent: args.initalContent
        })

        return docID;
    }

})



export const removeById = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {

        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unathorized");
        }

        const organizationId=(user.organization_id??undefined) as string| undefined;



        const docID = await ctx.db.get(args.id)


        if (!docID) {
            throw new ConvexError("Doc not found");

        }

        const isOwner = docID.ownerId === user.subject;

        if (!isOwner) {
            throw new ConvexError("Unathorized");

        }

        return await ctx.db.delete(args.id)


    }
})


export const updateById = mutation({
    args: { id: v.id("documents"), title: v.string() },
    handler: async (ctx, args) => {

        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unathorized");
        }

        const organizationId=(user.organization_id??undefined) as string| undefined;

        
        const docID = await ctx.db.get(args.id)

        if (!docID) {
            throw new ConvexError("Doc not found");

        }

        const isOwner = docID.ownerId === user.subject;

        const isOrgMember=!!(docID.organizationId && docID.organizationId===organizationId)


        if (!isOwner && !isOrgMember) {
            throw new ConvexError("Unathorized");

        }

        return await ctx.db.patch(args.id, {
            title: args.title
        })


    }
})


export const get = query({
    args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
    handler: async (ztx, { search, paginationOpts }) => {

        const user = await ztx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unathorized");
        }

        const organizationId=(user.organization_id??undefined) as string| undefined;

        if(search && organizationId){

            return await ztx.db.query("documents").withSearchIndex("search_title", (q) => q.search("title", search)
            .eq("organizationId", organizationId)).paginate(paginationOpts)

        }
        if(organizationId){
            return await ztx.db.query("documents")
            .withIndex("by_organization_id",(q)=>q.eq("organizationId",organizationId))
            .paginate(paginationOpts);
        }




        if (search) {

            return await ztx.db.query("documents").withSearchIndex("search_title", (q) => q.search("title", search)
                .eq("ownerId", user.subject)).paginate(paginationOpts)

        }


        return await ztx.db.query("documents")
        .withIndex("by_owner_id",(q)=>q.eq("ownerId",user.subject))
        .paginate(paginationOpts);
    }
})



export const getById=query({
    args:{id:v.id("documents")},
    handler:async(ctx,{id})=>{

        const doc=await ctx.db.get(id);

        return doc
    }
})