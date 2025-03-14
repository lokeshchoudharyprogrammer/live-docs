import { defineSchema, defineTable } from "convex/server";
import { v as xlz} from "convex/values";


export default defineSchema({
  documents: defineTable({
    title: xlz.string(),
    initialContent:xlz.optional(xlz.string()),
    ownerId:xlz.string(),
    roomId:xlz.optional(xlz.string()),
    organizationId:xlz.optional(xlz.string())
  })
  .index("by_owner_id",["ownerId"])
  .index("by_organization_id",["organizationId"])
  .searchIndex("search_title",{
    searchField:"title",
    filterFields:["ownerId","organizationId"]
  })
});
