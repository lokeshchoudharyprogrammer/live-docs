
"use client"




import Image from "next/image"
import Link from "next/link"
import { UserButton, OrganizationSwitcher } from "@clerk/clerk-react";

import DocumentInput from './document-input';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarShortcut } from "@/components/ui/menubar";
import {
    FileIcon, FileJsonIcon, GlobeIcon, Redo2Icon, UnderlineIcon, FileTextIcon, TextIcon, PrinterIcon, FilePlusIcon, FilePenIcon, TrashIcon, Undo2Icon, BoldIcon, ItalicIcon
    , RemoveFormattingIcon
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/store/use-editor-store";
import { Avatars } from "./avatars";
import { Inbox } from "./inbox";
import {Doc} from "../../../../convex/_generated/dataModel"
import {api} from "../../../../convex/_generated/api"
import {useMutation} from "convex/react"
import {useRouter} from "next/navigation"
import { toast } from "sonner";
import {RenameDialog} from "@/components/rename-dialog"
import {RemoveDialog}  from "@/components/remove-dialog"

interface Props {

    data:Doc<"documents">;
}

const Navbar = ({data}:Props) => {

    const { editor } = useEditorStore()
const router=useRouter()
    const mutation=useMutation(api.documents.create);
    
    const onNewDocument=()=>{
        mutation({
            title:"Untitle Doc",
            initalContent:""
        }).then((id)=>{
            router.push(`/documents/${id}`)

        }).catch(()=>toast.error("Somthing went wrong"))
    }

    const insertTable = ({ rows, cols }: { rows: number, cols: number }) => {
        editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run()
    }

    const onDownload = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename
        a.click()

    }
    const onSaveJSON = () => {
        if (!editor) return;

        const content = editor.getJSON();

        const blob = new Blob([JSON.stringify(content)], {
            type: "application/json"
        });

        onDownload(blob, `${data.title}.json`)

    }
    const onSaveHTML = () => {
        if (!editor) return;

        const content = editor.getHTML();

        const blob = new Blob([content], {
            type: "text/html"
        });

        onDownload(blob, `${data.title}.html`)

    }

    const onSaveText = () => {
        if (!editor) return;

        const content = editor.getText();

        const blob = new Blob([content], {
            type: "text/plain"
        });

        onDownload(blob, `${data.title}.txt`)

    }

    return (
        <nav className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <Link href="/">
                    <Image width={36} height={36} src="/logo.svg" alt="logo Icon" />
                </Link>
                <div className="flex flex-col">
                    <DocumentInput title={data.title}  id={data._id}/>
                    <div className="flex">
                        <Menubar className="border-none bg-transparent shadow-none h-auto p-0">

                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-p[7px] rounded-sm hover:bg-muted h-auto">
                                    File
                                </MenubarTrigger>
                                <MenubarContent className="print:hidden">
                                    <MenubarSub>
                                        <MenubarSubTrigger>

                                            <FileIcon className="size-4 mr-2" />
                                            Save
                                        </MenubarSubTrigger>

                                        <MenubarSubContent>
                                            <MenubarItem onClick={onSaveJSON}>
                                                <FileJsonIcon className="size-4 mr-2" />
                                                JSON

                                            </MenubarItem>
                                            <MenubarItem onClick={onSaveHTML}>
                                                <GlobeIcon className="size-4 mr-2" />
                                                HTML

                                            </MenubarItem>
                                            <MenubarItem onClick={() => window.print()}>
                                                <BsFilePdf className="size-4 mr-2" />
                                                PDF
                                            </MenubarItem>
                                            <MenubarItem onClick={onSaveText}>
                                                <FileTextIcon className="size-4 mr-2" />
                                                TEXT

                                            </MenubarItem>

                                        </MenubarSubContent>
                                    </MenubarSub>

                                    <MenubarItem onClick={onNewDocument}>
                                        <FilePlusIcon className="size-4 mr-2" />
                                        New Doc
                                    </MenubarItem>
                                    <MenubarSeparator />

                                    <RenameDialog 
                                    // @ts-expect-error
                                    onClick={(e)=>e.stopPropagation()}
                                    // @ts-expect-error
                                      onSelect={(e)=>e.preventDefault()}
                                    documentId={data._id} initalTitle={data.title}>
                                    <MenubarItem>
                                        <FilePenIcon className="size-4 mr-2" />
                                        Rename
                                    </MenubarItem>
                                    </RenameDialog>
                                    
                                    <RemoveDialog documentId={data._id}>
                                    <MenubarItem
                                    onClick={(e)=>e.stopPropagation()}
                                    onSelect={(e)=>e.preventDefault()}
                                    >
                                        <TrashIcon className="size-4 mr-2" />
                                        Remove
                                    </MenubarItem>
                                    </RemoveDialog>

                                    <MenubarSeparator />

                                    <MenubarItem onClick={() => window.print()}>
                                        <PrinterIcon className="size-4 mr-2" />
                                        Print <MenubarShortcut>⌘P</MenubarShortcut>

                                    </MenubarItem>



                                </MenubarContent>

                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-p[7px] rounded-sm hover:bg-muted h-auto">
                                    Edit
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem onClick={() => editor?.chain().focus().undo().run()} >
                                        <Undo2Icon className="size-4 mr-2" />
                                        Undo <MenubarShortcut>⎌</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem onClick={() => editor?.chain().focus().redo().run()} >
                                        <Redo2Icon className="size-4 mr-2" />
                                        Redo <MenubarShortcut>⎌</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-p[7px] rounded-sm hover:bg-muted h-auto">
                                    Insert
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            Table
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>
                                                1 X 1
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>
                                                2 X 2
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>
                                                3 X 3
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({ rows: 4, cols: 5 })}>
                                                4 X 4
                                            </MenubarItem>
                                        </MenubarSubContent>

                                    </MenubarSub>

                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-p[7px] rounded-sm hover:bg-muted h-auto">
                                    Formate
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <TextIcon className="size-4 mr-2" />
                                            Text
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>

                                            <MenubarItem>
                                                <BoldIcon className="size-4 mr-2" onClick={() => editor?.chain().focus().toggleBold().run()} />
                                                Bold
                                            </MenubarItem>

                                            <MenubarItem>
                                                <ItalicIcon className="size-4 mr-2" onClick={() => editor?.chain().focus().toggleItalic().run()} />
                                                Italic
                                            </MenubarItem>


                                            <MenubarItem>
                                                <UnderlineIcon className="size-4 mr-2" onClick={() => editor?.chain().focus().toggleUnderline().run()} />
                                                UnderLine
                                            </MenubarItem>

                                            {/* <MenubarItem>
                                                <StrickthroughIcon className="size-4 mr-2"/>
                                                    Strickthrough
                                            </MenubarItem> */}
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                                        <RemoveFormattingIcon className="size-4 mr-2" />
                                        Clear Formatting
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>

                        </Menubar>

                    </div>
                </div>
            </div>
            <div className="flex gap-3 items-center pl-6">
                <Avatars />
                <Inbox/>

                <OrganizationSwitcher
                    afterCreateOrganizationUrl="/"
                    afterLeaveOrganizationUrl="/"
                    afterSelectOrganizationUrl="/"
                    afterSelectPersonalUrl="/"
                />
                <UserButton />
            </div>
        </nav>
    )

}

export default Navbar