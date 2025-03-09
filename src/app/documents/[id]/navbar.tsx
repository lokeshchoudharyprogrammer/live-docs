
"use client"




import Image from "next/image"
import Link from "next/link"



import DocumentInput from './document-input';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarShortcut } from "@/components/ui/menubar";
import { FileIcon, FileJsonIcon, GlobeIcon, Redo2Icon,UnderlineIcon,  FileTextIcon,TextIcon, PrinterIcon, FilePlusIcon, FilePenIcon, TrashIcon, Undo2Icon,BoldIcon ,ItalicIcon
    ,RemoveFormattingIcon
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/store/use-editor-store";


const Navbar = () => {

    const {editor}=useEditorStore()

    return (
        <nav className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <Link href="/">
                    <Image width={36} height={36} src="/logo.svg" alt="logo Icon" />
                </Link>
                <div className="flex flex-col">
                    <DocumentInput />
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
                                            <MenubarItem>
                                                <FileJsonIcon className="size-4 mr-2" />
                                                JSON

                                            </MenubarItem>
                                            <MenubarItem>
                                                <GlobeIcon className="size-4 mr-2" />
                                                HTML

                                            </MenubarItem>
                                            <MenubarItem>
                                                <BsFilePdf className="size-4 mr-2" />
                                                PDF

                                            </MenubarItem>
                                            <MenubarItem>
                                                <FileTextIcon className="size-4 mr-2" />
                                                TEXT

                                            </MenubarItem>

                                        </MenubarSubContent>
                                    </MenubarSub>

                                    <MenubarItem>
                                        <FilePlusIcon className="size-4 mr-2" />
                                        New Doc
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>
                                        <FilePenIcon className="size-4 mr-2" />
                                        Rename
                                    </MenubarItem>
                                    <MenubarItem>
                                        <TrashIcon className="size-4 mr-2" />
                                        Remove
                                    </MenubarItem>
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
                                    <MenubarItem >
                                        <Undo2Icon className="size-4 mr-2" />
                                        Undo <MenubarShortcut>⎌</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem >
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
                                            <MenubarItem>
                                                1 X 1
                                            </MenubarItem>
                                            <MenubarItem>
                                                2 X 2
                                            </MenubarItem>
                                            <MenubarItem>
                                                3 X 3
                                            </MenubarItem>
                                            <MenubarItem>
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
                                            <TextIcon className="size-4 mr-2"/>
                                            Text
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>

                                            <MenubarItem>
                                            <BoldIcon className="size-4 mr-2"/>
                                                Bold
                                            </MenubarItem>
                                        
                                            <MenubarItem>
                                            <ItalicIcon className="size-4 mr-2"/>
                                                Italic
                                            </MenubarItem>
                                      
                                        
                                            <MenubarItem>
                                            <UnderlineIcon className="size-4 mr-2"/>
                                                UnderLine
                                            </MenubarItem>                                        

                                            {/* <MenubarItem>
                                                <StrickthroughIcon className="size-4 mr-2"/>
                                                    Strickthrough
                                            </MenubarItem> */}
                                        </MenubarSubContent> 
                                    </MenubarSub>
                                    <MenubarItem>
                                        <RemoveFormattingIcon className="size-4 mr-2"/>
                                        Clear Formatting
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>

                        </Menubar>

                    </div>
                </div>
            </div>
        </nav>
    )

}

export default Navbar