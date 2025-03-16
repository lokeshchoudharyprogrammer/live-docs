import React from 'react'
import Editor from './editor';
import Toolbar from './toolbar';
import Navbar from "./navbar"
import { Room } from './room';
import {Id} from "../../../../convex/_generated/dataModel"
import {Document} from "./document"
import {auth} from "@clerk/nextjs/server";

import { preloadQuery } from 'convex/nextjs';
import { api } from '../../../../convex/_generated/api';

interface DocumentIdProps {
  params: Promise<{
    id: any; documentId:Id<"documents"> 
}>
}


const Documentpage = async ({ params }: DocumentIdProps) => {
 

  const awitedParams = await params;
  const id = awitedParams.id;

  const {getToken}=await auth();
  const token=await getToken({template:"convex"}) ?? undefined 


  if(!token){
    throw new Error("Unauthorized");
  }

  const preloadedDoc=await preloadQuery(
    api.documents.getById,
    {id:id},
    {token}
  )

  return (

   <Document preloadedDocument={preloadedDoc}/>
  )
}

export default Documentpage

