"use clinet";

import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

import { Id } from "../../convex/_generated/dataModel";

import {AlertDialogAction, AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";


import { useMutation } from "convex/react";

import { api } from "../../convex/_generated/api";

import { useState } from "react";
import { toast } from "sonner";
import {useRouter} from "next/navigation"
interface Props {
    documentId: Id<"documents">;
    children: React.ReactNode
}


export const RemoveDialog = ({ documentId, children }: Props) => {

    const remove=useMutation(api.documents.removeById)
    const [isDel,setIsdel]=useState(false);
const router=useRouter()

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>

                    <AlertDialogTitle>
                        Are you sure?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your doc.

                    </AlertDialogDescription>


                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e)=>e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                    disabled={isDel}
                    onClick={(e)=>{
                        e.stopPropagation()
                        setIsdel(true)
                        remove({id:documentId})
                            .then(()=>{
                                toast.success("Doc Removed")
                                router.push("/")
                            })
                            .catch(()=>toast.error("Something went wrong"))
                            .finally(()=>setIsdel(false))
                    }}
                    >
                        Delete
                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    )
}