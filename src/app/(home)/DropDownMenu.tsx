import { Button } from '@/components/ui/button'
import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from 'lucide-react'
import React from 'react'
import { Id } from '../../../convex/_generated/dataModel'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { RemoveDialog } from '@/components/remove-dialog'
import { RenameDialog } from '@/components/rename-dialog'

interface Props {
    onNewTab: (id: Id<"documents">) => void
    title: string
    documentId: Id<"documents">
}


export const DropDownMenu = ({ documentId, title, onNewTab }: Props) => {

    console.log(title)

    return (

        <DropdownMenu>

            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size={"icon"} className='rounded-full'>
                    <MoreVertical className='size-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <RenameDialog documentId={documentId} initalTitle={title}>
                    <DropdownMenuItem 
                    onSelect={(e)=>e.preventDefault()}
                    onClick={(e)=>e.stopPropagation()}
                    >
                        <FilePenIcon className='size-4 mr-2'/>
                        Rename
                    </DropdownMenuItem>

                </RenameDialog>
                <RemoveDialog documentId={documentId}>
                    <DropdownMenuItem 
                    onSelect={(e)=>e.preventDefault()}
                    onClick={(e)=>e.stopPropagation()}
                    >
                        <TrashIcon className='size-4 mr-2'/>
                        Remove
                    </DropdownMenuItem>

                </RemoveDialog>
            <DropdownMenuItem onClick={()=>onNewTab(documentId)}>
            Open in a new tab
            <ExternalLinkIcon className='size-4 mr-2s'/>
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
