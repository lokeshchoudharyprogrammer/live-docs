"use clinet";

import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {
    documentId: Id<"documents">
    initalTitle:string
    children: React.ReactNode
}


export const RenameDialog = ({ documentId,initalTitle, children }: Props) => {

    const update=useMutation(api.documents.updateById)
    const [isUpdate,setIsUpdate]=useState(false);

    const [title,setTitle]=useState(initalTitle)
    const [open,setOpen]=useState(false)
 
    const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        setIsUpdate(true);

        update({id:documentId,title:title.trim()||"Untitled"}).finally(()=>{
            setIsUpdate(false);
            setOpen(false)
            
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}

            </DialogTrigger>
            <DialogContent onClick={(e)=>e.stopPropagation()}>
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            Rename Doc
                        </DialogTitle>
                        <DialogDescription>
                            Enter a new name for this doc
                        </DialogDescription>
                    </DialogHeader>
                    <div className="my-4">
                        <Input value={title} onChange={(e)=>setTitle(e.target.value)} 
                        onClick={(e)=>e.stopPropagation()}
                        placeholder="Doc Title"
                        
                        />
                    </div>
                    <DialogFooter>
                        <Button
                        type="button"
                        variant={"ghost"}
                        disabled={isUpdate}
                        onClick={(e)=>{
                            e.stopPropagation()
                            setOpen(false)
                        }}
                        
                        >Cancel</Button>

                        <Button
                         type="submit"
                                                 disabled={isUpdate}
                         onClick={(e)=>{
                             e.stopPropagation()
                          
                         }}
                        >Save</Button>
                    </DialogFooter>


                </form>
            </DialogContent>
        </Dialog>
       
    )
}